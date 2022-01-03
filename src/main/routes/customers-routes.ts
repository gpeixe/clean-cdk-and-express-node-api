import { Router } from 'express'
import { adaptExpressRoute } from '../adapters/express-adapter'

import { makeAddCustomerController } from '../factories/controllers/add-customer-controller-factory'
import { makeLoadAllCustomersController } from '../factories/controllers/load-all-customers-controller-factory'
import { makeUpdateCustomerController } from '../factories/controllers/update-customer-controller-factory'
import { makeDeleteCustomerController } from '../factories/controllers/delete-customer-controller-factory'

export default (router: Router): void => {
  router.post('/customers', adaptExpressRoute(makeAddCustomerController()))
  router.get('/customers', adaptExpressRoute(makeLoadAllCustomersController()))
  router.delete('/customers/:customer_id', adaptExpressRoute(makeDeleteCustomerController()))
  router.put('/customers/:customer_id', adaptExpressRoute(makeUpdateCustomerController()))
}