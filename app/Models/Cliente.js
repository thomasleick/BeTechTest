'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Cliente extends Model {
    vendas () {
        return this.hasMany('App/Models/Venda')
  }
}

module.exports = Cliente
