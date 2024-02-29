'use strict'

const Cliente = use('App/Models/Cliente')

    class ClienteController {
        async index ({ response }) {
        try {
        // Pegar a lista de clientes no banco de dados
        const clients = await Cliente.query().orderBy('id').fetch()

        // Verifica se a lista esta vazia
        if (clients.rows.length === 0) {
            return response.status(204).json({ message: 'No clients found.' })
        }

        // Retorna apenas os dados essenciais de cada cliente
        const simplifiedClients = clients.map(client => {
            return {
            id: client.id,
            name: client.name,
            email: client.email,
            }
        })

        return response.status(200).json({ clients: simplifiedClients })
        } catch (error) {
        console.error(error)
        return response.status(500).json({ message: 'Failed to fetch clients.' })
        }
    }
}

module.exports = ClienteController
