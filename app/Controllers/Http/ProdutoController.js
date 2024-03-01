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

            // Retorna apenas os dados essenciais de cada produto
            const simplifiedProdutos = produtos.map(produto => {
            return {
                id: produto.id,
                nome: produto.nome,
                descricao: produto.descricao,
                // Adicione outros campos essenciais conforme necessário
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
}

module.exports = ProdutoController
