'use strict'

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Usuario extends Model {
  static boot () {
    super.boot()

    /**
     * A hook to hash the usuario password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async (usuarioInstance) => {
      if (usuarioInstance.dirty.password) {
        usuarioInstance.password = await Hash.make(usuarioInstance.password)
      }
    })
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens () {
    return this.hasMany('App/Models/Token')
  }
}

module.exports = Usuario
