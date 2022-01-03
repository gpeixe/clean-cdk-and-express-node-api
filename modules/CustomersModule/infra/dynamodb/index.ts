import { Construct } from '@aws-cdk/core'
import { makeCustomersTable } from './tables/customers'

export class CustomersModuleDynamoDb extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id)
    makeCustomersTable(this)
  }
}