import { Construct, Stack, StackProps } from "@aws-cdk/core";
import { CustomersModuleDynamoDb } from "./infra/dynamodb";
import { CustomersModuleLambdas } from "./infra/lambda";

export class CustomersModule extends Stack {
  constructor(app: Construct, name: string, props?: StackProps) {
    super(app, name, props)
    new CustomersModuleLambdas(this, 'CustomersModuleLambdas')
    new CustomersModuleDynamoDb(this, 'CustomersModuleDynamoDb')
  }
}
