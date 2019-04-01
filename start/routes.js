'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.group(() => {
  Route.post('signup', 'UserController.register')
  Route.post('signin', 'UserController.login')
}).middleware(['guest'])

Route.get('user', 'UserController.user').middleware(['auth'])

// category
Route.group(() => {
  Route.get('categories/:id', 'CategoryController.show')
  Route.patch('categories/:id', 'CategoryController.update').middleware(['auth'])
  Route.delete('categories/:id', 'CategoryController.delete').middleware(['auth'])
}).middleware(['findCategory'])
Route.get('categories', 'CategoryController.index')
Route.post('categories', 'CategoryController.store').middleware(['auth'])

// post
Route.group(() => {
  Route.get('posts/:id', 'PostController.show')
  Route.patch('posts/:id', 'PostController.update').middleware(['auth'])
  Route.delete('posts/:id', 'PostController.delete').middleware(['auth'])
  Route.put('posts/:id', 'CommentController.store').middleware(['auth']) // comment
}).middleware(['findPost'])
Route.get('posts', 'PostController.index')
Route.post('posts', 'PostController.store').middleware(['auth'])

// product type
Route.group(() => {
  Route.get('product-types/:id', 'ProductTypeController.show')
  Route.patch('product-types/:id', 'ProductTypeController.update').middleware(['auth'])
  Route.delete('product-types/:id', 'ProductTypeController.delete').middleware(['auth'])
}).middleware(['findProductType'])
Route.get('product-types', 'ProductTypeController.index')
Route.post('product-types', 'ProductTypeController.store').middleware(['auth'])

// product
Route.group(() => {
  Route.get('products/:id', 'ProductController.show')
  Route.patch('products/:id', 'ProductController.update').middleware(['auth'])
  Route.delete('products/:id', 'ProductController.delete').middleware(['auth'])
}).middleware(['findProduct'])
Route.get('products', 'ProductController.index')
Route.post('products', 'ProductController.store').middleware(['auth'])



