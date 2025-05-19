module "visitor-counter" {
    source = "./VisitorCounter"


    account_id = var.account_id
    aws_region = var.aws_region
    s3_site_bucket = var.s3_site_bucket
    s3_script_key    = var.s3_script_key
    cors_allowed_origin = var.cors_allowed_origin
    lambda_function_name = var.lambda_function_name
    VisitorCount_policy_name = var.VisitorCount_policy_name
    VisitorCount_role_name = var.VisitorCount_role_name
}
