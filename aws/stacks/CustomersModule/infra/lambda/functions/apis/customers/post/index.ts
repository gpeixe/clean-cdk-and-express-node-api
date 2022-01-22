import { Construct, Duration } from '@aws-cdk/core'
import { NodejsFunction } from '@aws-cdk/aws-lambda-nodejs'
import { RetentionDays } from '@aws-cdk/aws-logs'
import * as lambda from '@aws-cdk/aws-lambda'
import * as path from 'path'

import { ParameterTier, ParameterType, StringParameter } from '@aws-cdk/aws-ssm'

import { Table } from '@aws-cdk/aws-dynamodb'

export function makeAddCustomerLambda(app: Construct) {
  const customersTable = Table.fromTableAttributes(
    app,
    'CustomersTableImportedFromAddCustomerLambda',
    {
      tableName: StringParameter.fromStringParameterName(
        app,
        'CustomersTableAddCustomerLambdaParameter',
        'modules.dynamodb.dynamodb.table.customers'
      ).stringValue
    }
  )

  const resource = new NodejsFunction(app, 'AddCustomerLambda', {
    handler: 'handler',
    functionName: 'customers-API-addCustomer-lambda',
    entry: path.join(__dirname, `/handler.ts`),
    runtime: lambda.Runtime.NODEJS_14_X,
    logRetention: RetentionDays.SIX_MONTHS,
    timeout: Duration.seconds(15)
  })

  customersTable.grantReadWriteData(resource)

  new StringParameter(
    app,
    'modules.customers.lambda.api.customers.post',
    {
      parameterName: 'modules.customers.lambda.api.customers.post',
      stringValue: resource.functionArn,
      type: ParameterType.STRING,
      tier: ParameterTier.STANDARD
    }
  )

  return resource
}