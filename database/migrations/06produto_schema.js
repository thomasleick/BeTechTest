'use strict'

const Schema = use('Schema')

class ProdutosTableSchema extends Schema {
  up () {
    this.create('produtos', (table) => {
      table.increments()
      table.string('nome').notNullable()
      table.text('descricao')
      table.decimal('preco', 10, 2).notNullable()
      table.boolean('deletado').defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('produtos')
  }
}

module.exports = ProdutosTableSchema