#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CdkAwsSecurityStack } from '../lib/cdk-aws-security-stack';
import { MainRegionEnvironment } from '../lib/main-region-environment';
const bucketName: string = 'audit-bucket-matthew-is-insane'
const app = new cdk.App();
const regions = ['us-east-1', 'us-west-1', 'us-west-2', 'us-east-2']
const mainRegionEnv = new MainRegionEnvironment(app, `MainRegionEnvironment`, {
  env: {region:'us-west-2'},
  bucketName
})
for (const region of regions) {
  const trailStack = new CdkAwsSecurityStack(app, `CdkAwsSecurityStack-${region}`, {
    env: {region},
    bucket: bucketName
  })
  trailStack.addDependency(mainRegionEnv)
}