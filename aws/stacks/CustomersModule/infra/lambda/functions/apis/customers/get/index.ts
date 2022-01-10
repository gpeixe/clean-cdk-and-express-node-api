import { Construct, Duration } from '@aws-cdk/core'
import { NodejsFunction } from '@aws-cdk/aws-lambda-nodejs'
import { RetentionDays } from '@aws-cdk/aws-logs'
import * as lambda from '@aws-cdk/aws-lambda'
import * as path from 'path'

import { ParameterTier, ParameterType, StringParameter } from '@aws-cdk/aws-ssm'

import { Table } from '@aws-cdk/aws-dynamodb'

export function makeLoadAllCustomersLambda(app: Construct) {
  const customersTable = Table.fromTableAttributes(
    app,
    'CustomersTable',
    {
      tableName: StringParameter.fromStringParameterName(
        app,
        'CustomersTable',
        'modules.customers.dynamodb.table.customers'
      ).stringValue
    }
  )

  const resource = new NodejsFunction(app, 'LoadAllCustomersLambda', {
    handler: 'handler',
    functionName: 'customers-API-loadAllCustomers-lambda',
    entry: path.join(__dirname, `/handler.ts`),
    runtime: lambda.Runtime.NODEJS_14_X,
    logRetention: RetentionDays.SIX_MONTHS,
    timeout: Duration.seconds(15)
  })

  customersTable.grantReadData(resource)

  new StringParameter(
    app,
    'modules.customers.lambda.api.customers.get',
    {
      parameterName: 'modules.customers.lambda.api.customers.get',
      stringValue: resource.functionArn,
      type: ParameterType.STRING,
      tier: ParameterTier.STANDARD
    }
  )

  return resource
}