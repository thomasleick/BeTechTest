'use strict'

const { validateAll, schema, rules } = require('indicative/validator')

class ProdutoValidator {
  static async validate(data, method) {
    try {
      // Defina as regras de validação
      const validationRules = {}

      if (method === 'POST') {
        validationRules.nome = 'required|string'
        validationRules.preco = 'required|regex:^[0-9]*\.[0-9]{2}$'

      } else {
        validationRules.nome = 'string'
        validationRules.preco = 'regex:^([0-9]*\.[0-9]{2}$)?'
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

module.exports = ProdutoValidator
