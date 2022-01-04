import { Router } from 'express'
import { adaptExpressRoute } from '../adapters/express-adapter'

import { makeLoadAllCustomersController } from '../factories/controllers/load-all-customers-controller-factory'
import { makeUpdateCustomerController } from '../factories/controllers/update-customer-controller-factory'
import { makeDeleteCustomerController } from '../factories/controllers/delete-customer-controller-factory'
import { makeAddCustomerController } from '../factories/controllers/add-customer-controller-factory'
import { makeAddCustomerUseCase } from '../factories/use-cases/add-customer-factory'
import { makeUpdateCustomerUseCase } from '../factories/use-cases/update-customer-factory'
import { makeLoadAllCustomersUseCase } from '../factories/use-cases/load-all-customers-factory'
import { makeDeleteCustomerUseCase } from '../factories/use-cases/delete-customer-factory'
import { UseCaseOptions } from '../factories/use-cases/protocols/options'


export default (router: Router): void => {
  const repositoryOption: UseCaseOptions = { repository: 'mongo' }
  router.post('/customers', adaptExpressRoute(makeAddCustomerController(makeAddCustomerUseCase(repositoryOption))))
  router.get('/customers', adaptExpressRoute(makeLoadAllCustomersController(makeLoadAllCustomersUseCase(repositoryOption))))
  router.delete('/customers/:customer_id', adaptExpressRoute(makeDeleteCustomerController(makeDeleteCustomerUseCase(repositoryOption))))
  router.put('/customers/:customer_id', adaptExpressRoute(makeUpdateCustomerController(makeUpdateCustomerUseCase(repositoryOption))))
}