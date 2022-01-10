import { Construct, Stack, StackProps } from "@aws-cdk/core";
import { makeCustomersAPI } from "./infra/apigateway/apis/customers";

export class APIsModule extends Stack {
  constructor(app: Construct, name: string, props?: StackProps) {
    super(app, name, props)
    makeCustomersAPI(this)
  }
}