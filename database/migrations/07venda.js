'use strict'

const Schema = use('Schema')

class VendasTableSchema extends Schema {
  up () {
    this.create('vendas', (table) => {
      table.increments()
      table.integer('cliente_id').unsigned().references('id').inTable('clientes').onDelete('cascade')
      table.integer('produto_id').unsigned().references('id').inTable('produtos').onDelete('cascade')
      table.integer('quantidade').notNullable()
      table.decimal('preco_unitario', 10, 2).notNullable()
      table.decimal('preco_total', 10, 2).notNullable()
      table.dateTime('data_hora').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('vendas')
  }
}

module.exports = VendasTableSchema