#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CleanCdkStack } from '../lib/clean-cdk-stack';

const app = new cdk.App();
new CleanCdkStack(app, 'CleanCdkStack', {});
