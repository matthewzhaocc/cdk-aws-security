import * as cdk from "@aws-cdk/core";
import * as s3 from "@aws-cdk/aws-s3";
import * as iam from "@aws-cdk/aws-iam";
interface MainRegionEnvironmentProps extends cdk.StackProps {
  bucketName: string;
}
export class MainRegionEnvironment extends cdk.Stack {
  constructor(
    scope: cdk.Construct,
    id: string,
    props?: MainRegionEnvironmentProps
  ) {
    super(scope, id, props);

    const cloudtrailBucket = new s3.Bucket(this, "cloudtrail-bucket", {
      bucketName: props?.bucketName as string,
      encryption: s3.BucketEncryption.S3_MANAGED,
    });
    const bucketPolicy = iam.PolicyStatement.fromJson({
      Principal: {
        Service: ["cloudtrail.amazonaws.com", "config.amazonaws.com"],
      },
      Action: "s3:GetBucketAcl",
      Resource: `arn:aws:s3:::${props?.bucketName as string}`,
      Effect: "Allow",
      Condition: {},
    });
    const bucketPolicy2 = iam.PolicyStatement.fromJson({
      Principal: {
        Service: ["cloudtrail.amazonaws.com", "config.amazonaws.com"],
      },
      Action: ["s3:PutObject"],
      Resource: [`arn:aws:s3:::${props?.bucketName as string}/*`],
      Effect: "Allow",
      Condition: {
        StringEquals: {
          "s3:x-amz-acl": "bucket-owner-full-control",
        },
      }
    });
    cloudtrailBucket.addToResourcePolicy(bucketPolicy);
    cloudtrailBucket.addToResourcePolicy(bucketPolicy2)
  }
}
