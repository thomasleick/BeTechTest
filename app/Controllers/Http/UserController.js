'use strict'

class UserController {

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
