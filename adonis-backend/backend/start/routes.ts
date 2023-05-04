/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.resource('customers', 'CustomersController')
Route.post('/customersCheckEmailUnique','CustomersController.checkEmailUnique')
Route.post('/customersCheckVatNumberUnique','CustomersController.checkVatNumberUnique')

Route.resource('sites', 'SitesController')
Route.get('/sitesByCustomerId/:customerId', 'SitesController.getAllByCustomerId')

Route.resource('meters', 'MetersController')
Route.get('/metersBySiteId/:siteId', 'MetersController.getAllBySiteId')
Route.post('/metersCheckSerialNumberUnique','MetersController.checkSerialNumberUnique')

Route.resource('circuits', 'CircuitsController')
Route.get('/circuitsByMeterId/:meterId', 'CircuitsController.getAllByMeterId')
Route.get('/circuitsByParentCircuitId/:parentCircuitId', 'CircuitsController.getAllByParentCircuitId')