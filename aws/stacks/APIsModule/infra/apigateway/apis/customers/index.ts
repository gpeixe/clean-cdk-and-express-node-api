import { Cors, LambdaIntegration, RestApi } from '@aws-cdk/aws-apigateway'
import { Construct } from '@aws-cdk/core'
import { CustomersAPILambdas } from './Lambda'

export function makeCustomersAPI(app: Construct) {
  const lambdas = new CustomersAPILambdas(app)

  const resource = new RestApi(app, 'CustomersAPI', {
    restApiName: 'Customers API',
    defaultCorsPreflightOptions: {
      allowOrigins: Cors.ALL_ORIGINS,
      allowMethods: Cors.ALL_METHODS
    }
  })

  const customers = resource.root.addResource('customers')
  customers.addMethod('GET', new LambdaIntegration(lambdas.loadAllCustomersLambda))
  customers.addMethod('POST', new LambdaIntegration(lambdas.addCustomerLambda))

  const customerId = customers.addResource('{document}')
  customerId.addMethod('DELETE', new LambdaIntegration(lambdas.deleteCustomerLambda))
  customerId.addMethod('PUT', new LambdaIntegration(lambdas.updateCustomerLambda))
 
  return resource
}