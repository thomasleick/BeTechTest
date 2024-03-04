'use strict'

const Produto = use('App/Models/Produto')
const Venda = use('App/Models/Venda')
const Cliente = use('App/models/Cliente')

class VendaController {
  async store({ request, response }) {
    try {
      // Extrair os dados do produto do corpo da requisição
      const { cliente_id, produto_id, quantidade } = request.only(['cliente_id', 'produto_id', 'quantidade'])

      const cliente = await Cliente.find(cliente_id)

      // Verificar se o cliente existe
      if (!cliente) {
        return response.status(404).json({ message: 'Cliente não encontrado.' })
      }
      // Procurar o produto pelo id
      const produto = await Produto.find(produto_id)

      // Verifica se o produto existe
      if (!produto) {
        return response.status(404).json({ message: 'Produto não encontrado.' })
      }
      if (produto.deletado) {
        return response.status(400).json({ message: 'Produto deletado.' })
      }

      // Calcula o valor total da venda
      const preco_unitario = produto.preco
      const preco_total = quantidade * preco_unitario

      // Cria um novo registro de venda no banco de dados
      const venda = await Venda.create({
        cliente_id,
        produto_id,
        quantidade,
        preco_unitario,
        preco_total,
        data_hora: new Date().toISOString().slice(0, 19).replace('T', ' ')
      })

      // Retornar a venda recém-criada
      return response.status(201).json({ message: 'Venda registrada com sucesso.', venda })
    } catch (error) {
      console.error(error)
      return response.status(500).json({ message: 'Falha ao registrar a venda.' })
    }
  }
}

module.exports = VendaController
