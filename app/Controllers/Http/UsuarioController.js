'use strict'

const Usuario = use('App/Models/Usuario')

class UsuarioController {
    async signUp({ request, response }) {
        try {
        const { email, password } = request.only(['email', 'password'])

        // Verifica se o usuário já existe
        const existingUsuario = await Usuario.findBy('email', email)
        if (existingUsuario) {
            return response.status(400).send({ message: 'Usuário já existe.' })
        }

        // Cria um novo usuário
        const usuario = await Usuario.create({ email, password })

        return response.status(201).send({ message: 'Usuário criado com sucesso.', usuario })
        } catch (error) {
        console.error(error)

        // Lidar com erros de criação de usuário
        return response.status(500).send({ message: 'Erro ao criar usuário.' })
        }
    }
    async login({ request, auth, response }) {
        const { email, password } = request.all()

        try {

        // Autenticar o usuário
        const token = await auth.attempt(email, password)

        return token
        } catch (error) {
            console.error(error)

            // Lidar com erros de autenticação específicos
            if (error.name === 'PasswordMisMatchException') {
                return response.status(401).send({ message: 'Senha incorreta. Verifique suas credenciais.' })
            }

            if (error.name === 'UsuarioNotFoundException') {
                return response.status(404).send({ message: 'Usuário não encontrado. Verifique suas credenciais.' })
            }

            return response.status(401).send({ message: 'Falha na autenticação. Verifique suas credenciais.' })
        }
    }

}

module.exports = UsuarioController
