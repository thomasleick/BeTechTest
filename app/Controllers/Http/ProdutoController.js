'use strict'

const Produto = use('App/Models/Produto')

class ProdutoController {

    async index({ response }) {
        try {
            // Pegar a lista de produtos no banco de dados, ordenados alfabeticamente
            const produtos = await Produto.query().orderBy('nome').fetch()

            // Verificar se a lista está vazia
            if (produtos.rows.length === 0) {
                return response.status(204).json({ message: 'Nenhum produto encontrado.' })
            }

            // Se houver apenas um produto, retorna diretamente
            if (produtos.rows.length === 1) {
                const produto = produtos.rows[0]
                return response.status(200).json({ produtos: [{ id: produto.id, nome: produto.nome }] })
            }

            // Retorna apenas os dados essenciais de cada produto
            const simplifiedProdutos = produtos.rows.map(produto => {
                return {
                    id: produto.id,
                    nome: produto.nome,
                }
            })

            return response.status(200).json({ produtos: simplifiedProdutos })
        } catch (error) {
            console.error(error)
            return response.status(500).json({ message: 'Falha ao buscar produtos.' })
        }
    }

    async store({ request, response }) {
        try {
            // Extrair os dados do produto do corpo da requisição
            const data = request.only(['nome', 'descricao', 'preco'])

            // Criar um novo produto no banco de dados
            const produto = await Produto.create(data)

            // Retornar o produto recém-criado
            return response.status(201).json({ message: 'Produto adicionado com sucesso.', produto })
        } catch (error) {
            console.error(error)
            return response.status(500).json({ message: 'Erro ao adicionar produto.' })
        }
    }

    async show({ params, response }) {
        try {
        // Buscar o cliente pelo ID
        const produto = await Produto.find(params.id)

        if (!produto) {
            return response.status(404).json({ message: 'Produto não encontrado' })
        }

        return response.status(200).json(produto)
        } catch (error) {
        console.error(error)
        return response.status(500).json({ message: 'Erro ao buscar detalhes do produto' })
        }
    }

    async update ({ params, request, response }) {

        try {
        const produto = await Produto.find(params.id)

        if (!produto) {
            return response.status(404).json({ message: 'Produto não encontrado.' })
        }

        // Atualiza os dados do produto com base nos dados enviados na requisição
        produto.merge(request.only(['nome', 'descricao', 'preco']))
        await produto.save()

        return response.status(200).json({ message: 'Produto e informações relacionadas atualizados com sucesso.', produto })
        } catch (error) {
        console.error(error)
        await trx.rollback()
        return response.status(500).json({ message: 'Erro ao atualizar produto e informações relacionadas.' })
        }
    }
}

module.exports = ProdutoController
