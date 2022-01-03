import * as cdk from '@aws-cdk/core';
import { APIsModule } from '../modules/APIsModule';
import { CustomersModule } from '../modules/CustomersModule';

export class CleanCdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    new CustomersModule(this, 'CustomersModule', props)
    new APIsModule(this, 'APIsModule', props)
  }
}
