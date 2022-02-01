import { Router } from 'express'
import { adaptExpressRoute } from '../adapters/express-adapter'

import { makeLoadAllCustomersController, makeUpdateCustomerController, makeDeleteCustomerController, makeAddCustomerController } from '../factories/controllers'
import { makeAddCustomerUseCase, makeUpdateCustomerUseCase, makeLoadAllCustomersUseCase, makeDeleteCustomerUseCase, UseCaseOptions } from '../factories/use-cases'

export default (router: Router): void => {
  router.post('/customers', addCustomerControllerExpressRoute())
  router.get('/customers', loadAllCustomersControllerExpressRoute())
  router.delete('/customers/:document', deleteCustomerControllerExpressRoute())
  router.put('/customers/:document', updateCustomerControllerExpressRoute())
}

const addCustomerControllerExpressRoute = () => {
  const repositoryOption: UseCaseOptions = { repository: 'mongo' }
  return adaptExpressRoute(makeAddCustomerController(makeAddCustomerUseCase(repositoryOption)))
}

const loadAllCustomersControllerExpressRoute = () => {
  const repositoryOption: UseCaseOptions = { repository: 'mongo' }
  return adaptExpressRoute(makeLoadAllCustomersController(makeLoadAllCustomersUseCase(repositoryOption)))
}

const deleteCustomerControllerExpressRoute = () => {
  const repositoryOption: UseCaseOptions = { repository: 'mongo' }
  return adaptExpressRoute(makeDeleteCustomerController(makeDeleteCustomerUseCase(repositoryOption)))
}

const updateCustomerControllerExpressRoute = () => {
  const repositoryOption: UseCaseOptions = { repository: 'mongo' }
  return adaptExpressRoute(makeUpdateCustomerController(makeUpdateCustomerUseCase(repositoryOption)))
}