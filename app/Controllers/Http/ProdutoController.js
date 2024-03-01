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
}

module.exports = ProdutoController
