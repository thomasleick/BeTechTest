'use strict'

const User = use('App/Models/User')

class UserController {
    async signUp({ request, response }) {
        try {
        const { email, password } = request.only(['email', 'password'])
        
        // Verifica se o usuário já existe
        const existingUser = await User.findBy('email', email)
        if (existingUser) {
            return response.status(400).send({ message: 'Usuário já existe.' })
        }

        // Cria um novo usuário
        const user = await User.create({ email, password })

        return response.status(201).send({ message: 'Usuário criado com sucesso.', user })
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

            if (error.name === 'UserNotFoundException') {
                return response.status(404).send({ message: 'Usuário não encontrado. Verifique suas credenciais.' })
            } 

            return response.status(401).send({ message: 'Falha na autenticação. Verifique suas credenciais.' })
        }
    }

}

module.exports = UserController
