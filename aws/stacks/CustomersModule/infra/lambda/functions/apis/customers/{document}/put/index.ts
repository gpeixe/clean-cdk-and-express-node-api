import { Construct, Duration } from '@aws-cdk/core'
import { NodejsFunction } from '@aws-cdk/aws-lambda-nodejs'
import { RetentionDays } from '@aws-cdk/aws-logs'
import * as lambda from '@aws-cdk/aws-lambda'
import * as path from 'path'

import { ParameterTier, ParameterType, StringParameter } from '@aws-cdk/aws-ssm'

import { Table } from '@aws-cdk/aws-dynamodb'

export function makeUpdateCustomerLambda(app: Construct) {
  const customersTable = Table.fromTableAttributes(
    app,
    'CustomersTableImportedFromUpateCustomerLambda',
    {
      tableName: StringParameter.fromStringParameterName(
        app,
        'CustomersTableImportedFromUpateCustomerLambdaParameter',
        'modules.dynamodb.dynamodb.table.customers'
      ).stringValue
    }
  )

  console.log("path.dirname(''): ", path.dirname(''))
  const resource = new NodejsFunction(app, 'UpdateCustomerLambda', {
    handler: 'handler',
    functionName: 'customers-API-updateCustomer-lambda',
    entry: path.join(__dirname, `/handler.ts`),
    runtime: lambda.Runtime.NODEJS_14_X,
    logRetention: RetentionDays.SIX_MONTHS,
    timeout: Duration.seconds(15)
  })

  customersTable.grantReadWriteData(resource)

  new StringParameter(
    app,
    'modules.customers.lambda.api.customers.document.put',
    {
      parameterName: 'modules.customers.lambda.api.customers.document.put',
      stringValue: resource.functionArn,
      type: ParameterType.STRING,
      tier: ParameterTier.STANDARD
    }
  )

  return resource
}