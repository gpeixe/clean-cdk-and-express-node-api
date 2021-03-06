import { Construct } from '@aws-cdk/core'
import { makeLoadAllCustomersLambda } from './functions/apis/customers/get'
import { makeAddCustomerLambda } from './functions/apis/customers/post'
import { makeDeleteCustomerLambda } from './functions/apis/customers/{document}/delete'
import { makeUpdateCustomerLambda } from './functions/apis/customers/{document}/put'

export class CustomersModuleLambdas extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id)
    makeLoadAllCustomersLambda(this)
    makeAddCustomerLambda(this)
    makeDeleteCustomerLambda(this)
    makeUpdateCustomerLambda(this)
  }
}