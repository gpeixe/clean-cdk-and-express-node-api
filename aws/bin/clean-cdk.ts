#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CustomersModule, APIsModule } from '../stacks';
import { env } from '../env'

const app = new cdk.App();

new APIsModule(app, 'APIsModule', env)
new CustomersModule(app, 'CustomersModule', env)

