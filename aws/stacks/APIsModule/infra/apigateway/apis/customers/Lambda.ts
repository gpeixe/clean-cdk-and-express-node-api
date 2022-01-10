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
      'LoadAllCustomersLambdaImportedFromArn',
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
      'AddCustomerLambdaImportedFromArn',
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
      'DeleteCustomerLambdaImportedFromArn',
      {
        sameEnvironment: true,
        functionArn: StringParameter.fromStringParameterName(
          app,
          'modules.customers.lambda.api.customers.{customer_id}.delete',
          'modules.customers.lambda.api.customers.{customer_id}.delete'
        ).stringValue
      }
    )

    this.updateCustomerLambda = Function.fromFunctionAttributes(
      app,
      'UpdateCustomerLambdaImportedFromArn',
      {
        sameEnvironment: true,
        functionArn: StringParameter.fromStringParameterName(
          app,
          'modules.customers.lambda.api.customers.{customer_id}.put',
          'modules.customers.lambda.api.customers.{customer_id}.put'
        ).stringValue
      }
    )
  }
}