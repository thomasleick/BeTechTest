'use strict'

const { validateAll, schema, rules } = require('indicative/validator')

class VendaValidator {
  static async validate(data, method) {
    try {
      // Defina as regras de validação
      const validationRules = {}

      if (method === 'POST') {
        validationRules.quantidade = 'required|integer'
        validationRules.cliente_id = 'required|integer'
        validationRules.produto_id = 'required|integer'

      } else {

      }

      // Valide os dados de acordo com as regras definidas
      await validateAll({...data, preco: data?.preco?.toString()}, validationRules)

      // Se a validação for bem-sucedida, retorne true
      return true
    } catch (errors) {
      // Se houver erros de validação, capture e manipule os erros conforme necessário
      throw errors
    }
  }
}

module.exports = VendaValidator
