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
Route.post('signup', 'UsuarioController.signUp').middleware('checkCredentials')
Route.post('/login', 'UsuarioController.login').middleware('checkCredentials')
Route.group(() => {
  Route.get('clientes', 'ClienteController.index').as('clients.index').middleware('auth')
  Route.post('clientes', 'ClienteController.store').as('clients.store').middleware('auth').middleware('validateParams:ClienteValidator')
  Route.get('clientes/:id', 'ClienteController.show').as('clients.show').middleware('auth')
  Route.put('clientes/:id', 'ClienteController.update').as('clients.update').middleware('auth').middleware('validateParams:ClienteValidator')
  Route.delete('clientes/:id', 'ClienteController.delete').as('clients.delete').middleware('auth')
})
Route.group(() => {
  Route.get('/produtos', 'ProdutoController.index').middleware('auth')
  Route.get('/produtos/:id', 'ProdutoController.show').middleware('auth')
  Route.post('/produtos', 'ProdutoController.store').middleware('auth').middleware('validateParams:ProdutoValidator')
  Route.put('/produtos/:id', 'ProdutoController.update').middleware('auth').middleware('validateParams:ProdutoValidator')
  Route.delete('/produtos/:id', 'ProdutoController.delete').middleware('auth')
})
Route.group(() => {
  Route.post('/vendas', 'VendaController.store').middleware(['auth']).middleware('validateParams:VendaValidator')})
