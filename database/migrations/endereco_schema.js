'use strict'

const Schema = use('Schema')

class EnderecosTableSchema extends Schema {
  up () {
    this.create('enderecos', (table) => {
      table.increments()
      table.integer('cliente_id').unsigned().references('id').inTable('clientes').onDelete('cascade')
      table.string('rua').notNullable()
      table.string('cidade').notNullable()
      table.string('estado').notNullable()
      table.string('cep', 9).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('enderecos')
  }
}

module.exports = EnderecosTableSchema