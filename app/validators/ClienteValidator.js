'use strict'

const { validateAll, schema, rules } = require('indicative/validator')

class ClienteValidator {
  static async validate(data) {
    try {
      // Defina as regras de validação
      const validationRules = {
        nome: 'required|string',
        cpf: 'required|string|min:11|max:14',
        rua: 'required|string',
        cidade: 'required|string',
        estado: 'required|string',
        cep: 'required|string|min:8|max:9',
        numero: 'required|string|min:9|max:20',
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
