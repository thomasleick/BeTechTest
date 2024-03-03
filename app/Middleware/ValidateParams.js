'use strict'

class ValidateParams {
  async handle ({ request, response, params, body, query }, next, [validatorName]) {

    try {
      // Obtenha o esquema de validação com base no nome fornecido
      const Validator = use(`App/validators/${validatorName}`)

      // Valide os parâmetros da solicitação
      await Validator.validate(request.all(), request.request.method)
      // Chame o próximo middleware se a validação for bem-sucedida
      await next()
    } catch (error) {

      console.log(error)
      return response.status(400).json({
        status: 'error',
        message: 'Falha na validação dos dados',
        errors: error
      })
    }
  }
}

module.exports = ValidateParams
