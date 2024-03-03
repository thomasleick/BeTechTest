'use strict'

const { validateAll, schema, rules } = require('indicative/validator')

class ClienteValidator {
  static async validate(data, method) {
    try {
      // Defina as regras de validação
      const validationRules = {}

      if (method === 'POST') {
        validationRules.nome = 'required|string'
        validationRules.cpf = 'required|string|min:11|max:14'
        validationRules.rua = 'required|string'
        validationRules.cidade = 'required|string'
        validationRules.estado = 'required|string'
        validationRules.cep = 'required|string|min:8|max:9'
        validationRules.numero = 'required|string|min:9|max:20'

      } else {
          validationRules.nome = 'string'
          validationRules.cpf = 'string|min:11|max:14'
          validationRules.rua = 'string'
          validationRules.cidade = 'string'
          validationRules.estado = 'string'
          validationRules.cep = 'string|min:8|max:9'
          validationRules.numero = 'string|min:9|max:20'
      }

      // Valide os dados de acordo com as regras definidas
      await validateAll(data, validationRules)

      // Se a validação for bem-sucedida, retorne true
      return true
    } catch (errors) {
      // Se houver erros de validação, capture e manipule os erros conforme necessário
      throw errors
    }
  }
}

module.exports = ClienteValidator
