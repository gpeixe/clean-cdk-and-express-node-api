import { Construct, Stack, StackProps } from "@aws-cdk/core";
import { CustomersModuleLambdas } from "./infra/lambda";

export class CustomersModule extends Stack {
  constructor(app: Construct, name: string, props?: StackProps) {
    super(app, name, props)
    new CustomersModuleLambdas(this, 'CustomersModuleLambdas')
  }
}
