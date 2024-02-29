'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome')
Route.post('signup', 'UserController.signUp').middleware('checkCredentials')
Route.post('/login', 'UserController.login').middleware('checkCredentials')
Route.group(() => {
  Route.get('clientes', 'ClienteController.index').as('clients.index')
  Route.post('clientes', 'ClienteController.store').as('clients.store')
  Route.get('clientes/:id', 'ClienteController.show').as('clients.show')
  Route.put('clientes/:id', 'ClienteController.update').as('clients.update')
  Route.delete('clientes/:id', 'ClienteController.delete').as('clients.delete')
})
