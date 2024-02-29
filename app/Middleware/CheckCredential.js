'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class CheckCredential {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request }, next) {
    const email = request.input('email')
    const password = request.input('password')

    if (!email || !password) {
      return response.status(400).send({ message: 'É necessário fornecer email e senha.' })
    }
    await next()
  }
}

module.exports = CheckCredential
