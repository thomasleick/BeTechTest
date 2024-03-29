'use strict'

const Cliente = use('App/Models/Cliente')
const Endereco = use('App/Models/Endereco')
const Telefone = use('App/Models/Telefone')
const Database = use('Database')

    class ClienteController {
      async index ({ response }) {
        try {
        // Pegar a lista de clientes no banco de dados
        const clients = await Cliente.query().orderBy('id').fetch()

        // Verifica se a lista esta vazia
        if (clients.rows.length === 0) {
            return response.status(204).json({ message: 'No clients found.' })
        }

        if (clients.rows.length === 1) {
          const client = clients.rows[0]
          // Retorna apenas os dados essenciais de cada cliente
          const simplifiedClient = { id: client.id, nome: client.nome, cpf: client.cpf }

          return response.status(200).json({ clientes: [{ ...simplifiedClient }] })
        }

        // Retorna apenas os dados essenciais de cada cliente
        const simplifiedClients = clients.map(client => {
            return {
            id: client.id,
            nome: client.nome,
            cpf: client.cpf,
            }
        })

        return response.status(200).json({ clientes: simplifiedClients })
        } catch (error) {
        console.error(error)
        return response.status(500).json({ message: 'Failed to fetch clients.' })
        }
      }

      async store({ request, response }) {
        const trx = await Database.beginTransaction()
        try {
          // Extrair os dados do cliente, endereço e telefone do corpo da requisição
          const data = request.only(['nome', 'cpf'])
          const enderecoData = request.only(['rua', 'cidade', 'estado', 'cep'])
          const telefoneData = request.only(['numero'])

          // Criar um novo cliente no banco de dados
          const cliente = await Cliente.create(data, trx)

          // Criar um novo endereço associado ao cliente
          const endereco = await Endereco.create({ ...enderecoData, cliente_id: cliente.id }, trx)

          // Criar um novo telefone associado ao cliente
          const telefone = await Telefone.create({ ...telefoneData, cliente_id: cliente.id }, trx)
          await trx.commit()

          // Retornar o cliente, endereço e telefone recém-criados
          return response.status(201).json({ message: 'Cliente adicionado com sucesso.', cliente, endereco, telefone })
        } catch (error) {
          await trx.rollback()
          // Verificar se o erro é de duplicação de entrada (ER_DUP_ENTRY)
          if (error.code === 'ER_DUP_ENTRY') {
            return response.status(400).json({ message: 'Já existe um cliente com este cpf.' })
          }

          // Lidar com outros erros de maneira genérica
          console.error(error)
          return response.status(500).json({ message: 'Erro ao adicionar cliente.' })
        }
      }


  async show({ params, request, response }) {
    try {
      // Buscar o cliente pelo ID
      const cliente = await Cliente.find(params.id)

      if (!cliente) {
        return response.status(404).json({ message: 'Cliente não encontrado' })
      }

      // Query para buscar todas as vendas do cliente ordenadas pela data, da mais recente para a mais antiga
      let vendasQuery = cliente.vendas().orderBy('data_hora', 'desc')

      // Verificar se há parâmetros de consulta para filtrar as vendas por mês e ano
      const { mes, ano } = request.qs

      if (mes && ano) {
        vendasQuery = vendasQuery
          .whereRaw('EXTRACT(MONTH FROM data_hora) = ?', [mes])
          .whereRaw('EXTRACT(YEAR FROM data_hora) = ?', [ano])
      }

      // Executar a consulta
      const vendas = await vendasQuery.fetch()

      return response.status(200).json({ cliente, vendas })
    } catch (error) {
      console.error(error)
      return response.status(500).json({ message: 'Erro ao buscar detalhes do cliente' })
    }
  }

  async update ({ params, request, response }) {
    const trx = await Database.beginTransaction()

    try {
      const cliente = await Cliente.find(params.id)

      if (!cliente) {
        await trx.rollback()
        return response.status(404).json({ message: 'Cliente não encontrado.' })
      }

      // Atualiza os dados do cliente com base nos dados enviados na requisição
      cliente.merge(request.only(['nome', 'cpf']))
      await cliente.save(trx)

      // Atualiza os dados do endereço do cliente
      const endereco = await Endereco.findBy('cliente_id', cliente.id)
      endereco.merge(request.only(['rua', 'cidade', 'estado', 'cep']))
      await endereco.save(trx)

      // Atualiza os dados do telefone do cliente
      const telefone = await Telefone.findBy('cliente_id', cliente.id)
      telefone.numero = request.input('numero')
      await telefone.save(trx)

      await trx.commit()

      return response.status(200).json({ message: 'Cliente e informações relacionadas atualizados com sucesso.', cliente })
    } catch (error) {

      await trx.rollback()
      if (error.code === 'ER_DUP_ENTRY') {
          return response.status(400).json({ message: 'Já existe um cliente com este cpf.' })
      }
      console.error(error)
      return response.status(500).json({ message: 'Erro ao atualizar cliente e informações relacionadas.' })
    }
  }

  async delete ({ params, response }) {
    try {
      // Encontrar o cliente pelo ID
      const cliente = await Cliente.find(params.id)

      // Verificar se o cliente existe
      if (!cliente) {
        return response.status(404).json({ message: 'Cliente não encontrado.' })
      }

      // Excluir o cliente
      await cliente.delete()

      return response.status(200).json({ message: 'Cliente excluído com sucesso.' })
    } catch (error) {
      console.error(error)
      return response.status(500).json({ message: 'Erro ao excluir cliente.' })
    }
  }
}

module.exports = ClienteController
