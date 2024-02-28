'use strict'

const Schema = use('Schema')

class TelefonesTableSchema extends Schema {
  up () {
    this.create('telefones', (table) => {
      table.increments()
      table.integer('cliente_id').unsigned().references('id').inTable('clientes').onDelete('cascade')
      table.string('numero', 20).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('telefones')
  }
}

module.exports = TelefonesTableSchema