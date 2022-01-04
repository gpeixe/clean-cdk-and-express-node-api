import { Router } from 'express'
import { adaptExpressRoute } from '../adapters/express-adapter'

import { makeLoadAllCustomersController, makeUpdateCustomerController, makeDeleteCustomerController, makeAddCustomerController } from '../factories/controllers'
import { makeAddCustomerUseCase, makeUpdateCustomerUseCase, makeLoadAllCustomersUseCase, makeDeleteCustomerUseCase, UseCaseOptions } from '../factories/use-cases'

export default (router: Router): void => {
  const repositoryOption: UseCaseOptions = { repository: 'mongo' }
  router.post('/customers', adaptExpressRoute(makeAddCustomerController(makeAddCustomerUseCase(repositoryOption))))
  router.get('/customers', adaptExpressRoute(makeLoadAllCustomersController(makeLoadAllCustomersUseCase(repositoryOption))))
  router.delete('/customers/:customer_id', adaptExpressRoute(makeDeleteCustomerController(makeDeleteCustomerUseCase(repositoryOption))))
  router.put('/customers/:customer_id', adaptExpressRoute(makeUpdateCustomerController(makeUpdateCustomerUseCase(repositoryOption))))
}