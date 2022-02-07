import { Function, IFunction } from '@aws-cdk/aws-lambda'
import { StringParameter } from '@aws-cdk/aws-ssm'
import { Construct } from '@aws-cdk/core'

export class CustomersAPILambdas {
  loadAllCustomersLambda: IFunction
  addCustomerLambda: IFunction
  deleteCustomerLambda: IFunction
  updateCustomerLambda: IFunction

  constructor(app: Construct) {
    this.loadAllCustomersLambda = Function.fromFunctionAttributes(
      app,
      'LoadAllCustomersLambdaImportedFromCustomersAPI',
      {
        sameEnvironment: true,
        functionArn: StringParameter.fromStringParameterName(
          app,
          'modules.customers.lambda.api.customers.get',
          'modules.customers.lambda.api.customers.get'
        ).stringValue
      }
    )

    this.addCustomerLambda = Function.fromFunctionAttributes(
      app,
      'AddCustomerLambdaImportedFromCustomersAPI',
      {
        sameEnvironment: true,
        functionArn: StringParameter.fromStringParameterName(
          app,
          'modules.customers.lambda.api.customers.post',
          'modules.customers.lambda.api.customers.post'
        ).stringValue
      }
    )

    this.deleteCustomerLambda = Function.fromFunctionAttributes(
      app,
      'DeleteCustomerLambdaImportedFromCustomersAPI',
      {
        sameEnvironment: true,
        functionArn: StringParameter.fromStringParameterName(
          app,
          'modules.customers.lambda.api.customers.document.delete',
          'modules.customers.lambda.api.customers.document.delete'
        ).stringValue
      }
    )

    this.updateCustomerLambda = Function.fromFunctionAttributes(
      app,
      'UpdateCustomerLambdaImportedFromCustomersAPI',
      {
        sameEnvironment: true,
        functionArn: StringParameter.fromStringParameterName(
          app,
          'modules.customers.lambda.api.customers.document.put',
          'modules.customers.lambda.api.customers.document.put'
        ).stringValue
      }
    )
  }
}