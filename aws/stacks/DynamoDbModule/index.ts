import { StackProps, Stack, Construct } from '@aws-cdk/core'
import { DynamoDbTables } from './dynamodb/tables'

export class DynamoDbModule extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props)
    new DynamoDbTables(this, 'DynamoDbTables')
  }
}