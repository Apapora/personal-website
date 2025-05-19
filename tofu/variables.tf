variable "aws_region" {
  description = "The AWS region to deploy resources in"
  type        = string
  default     = "us-east-1"
}

variable "dynamodb_table" {
  description = "The DynamoDB table for state locking"
  type        = string
}

variable "lambda_function_name" {
  default = "VisitorCount"
}

variable "s3_site_bucket" {
  description = "Bucket where website is stored"
  default = "www.chad-johnston.com"
}

variable "s3_script_key" {
  description = "Key to the Lambda zip"
  default = "scripts/lambda.zip"
}

variable "cors_allowed_origin" {
  default = "https://www.chad-johnston.com"
}

variable "admin_id" {
    description = "id of admin user"
}

variable "s3_log_bucket" {
    description = "Bucket to hold logs"
}

variable "acm_certificate_arn" {
  description = "ARN of the ACM certificate in us-east-1"
  type        = string
}

variable "www_bucket_name" {
  type        = string
  description = "WWW Site S3 bucket name"
}

variable "cloudfront_distribution_id" {
  type        = string
  description = "CloudFront distribution ID"
}

variable "account_id" {
  type        = string
  description = "AWS Account ID"
}

variable "github_username" {
  type        = string
  description = "GitHub IAM username"
}

variable "VisitorCount_role_name" {
    type = string
    description = "IAM role name for GetVisitorCount"
}

variable "VisitorCount_policy_name" {
  type = string
  description = "Policy name for GetVisitorCount"
}