variable "s3_site_bucket" {
  description = "Bucket name passed from root"
  type        = string
}

variable "s3_script_key" {
  description = "Object key passed from root"
  type        = string
}

variable "cors_allowed_origin" {
  default = "https://www.chad-johnston.com"
}

variable "lambda_function_name" {
    default = "VisitorCount"
}

variable "VisitorCount_role_name" {
    type = string
    description = "IAM role name for GetVisitorCount"
}

variable "VisitorCount_policy_name" {
  type = string
  description = "Policy name for GetVisitorCount"
}

variable "account_id" {
  type        = string
  description = "AWS Account ID"
}

variable "aws_region" {
  description = "The AWS region to deploy resources in"
  type        = string
  default     = "us-east-1"
}