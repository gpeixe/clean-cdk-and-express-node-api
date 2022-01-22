import { Construct } from '@aws-cdk/core'
import { makeCustomersTable } from './customers'

export class DynamoDbTables extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id)
    makeCustomersTable(this)
  }
}