import { Construct } from '@aws-cdk/core'
import {
  AttributeType,
  BillingMode,
  StreamViewType,
  Table
} from '@aws-cdk/aws-dynamodb'
import { ParameterTier, ParameterType, StringParameter } from '@aws-cdk/aws-ssm'

export function makeCustomersTable(app: Construct) {
  const resource = new Table(app, 'CustomersTable', {
    partitionKey: { name: 'document', type: AttributeType.STRING },
    tableName: 'customers',
    stream: StreamViewType.NEW_AND_OLD_IMAGES,
    billingMode: BillingMode.PAY_PER_REQUEST,
    pointInTimeRecovery: true
  })

  new StringParameter(app, 'modules.dynamodb.dynamodb.table.customers', {
    parameterName: 'modules.dynamodb.dynamodb.table.customers',
    stringValue: resource.tableName,
    type: ParameterType.STRING,
    tier: ParameterTier.STANDARD
  })
  return resource
}