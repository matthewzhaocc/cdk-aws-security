import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import * as cloudtrail from '@aws-cdk/aws-cloudtrail';
export interface SecurityStackProps extends cdk.StackProps {
  bucket: string
}
export class CdkAwsSecurityStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: SecurityStackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    new cloudtrail.Trail(this, 'audit-trail', {
      bucket: s3.Bucket.fromBucketName(this, 'trail-bucket', props?.bucket as string),
      enableFileValidation: true,
      isMultiRegionTrail: true
    })
  }
}
