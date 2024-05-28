provider "aws" {
  region = "us-east-1"
  default_tags {
    tags = {
      Tofu = "True"
    }
  }
}

terraform {
  backend "s3" {
    encrypt        = true
    bucket         = "apopora-tf-state-bucket"
    dynamodb_table = "tf-state-table"
    role_arn       = "$tf-state-management-role"
    key            = "personal-website"
  }
}

# DynamoDB Table
resource "aws_dynamodb_table" "visitor_count" {
  name         = "VisitorCount"
  billing_mode = "PAY_PER_REQUEST"

  attribute {
    name = "page"
    type = "S"
  }

  hash_key = "page"
}

# IAM Role for Lambda
resource "aws_iam_role" "lambda_exec_role" {
  name = "VisitorCount-role-morygxho"
  path = "/service-role/"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })
}

# IAM Policy for Lambda
resource "aws_iam_policy" "lambda_policy" {
  name = "VisitorCountPolicy"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "dynamodb:PutItem",
          "dynamodb:GetItem",
          "dynamodb:UpdateItem"
        ]
        Resource = "${aws_dynamodb_table.visitor_count.arn}"
      }
    ]
  })
}

# Attach IAM Policy to Role
resource "aws_iam_role_policy_attachment" "lambda_policy_attach" {
  role       = aws_iam_role.lambda_exec_role.name
  policy_arn = aws_iam_policy.lambda_policy.arn
}

# Lambda Function
resource "aws_lambda_function" "visitor_count" {
  function_name = "VisitorCount"
  architectures = [
    "arm64",
  ]
  role    = aws_iam_role.lambda_exec_role.arn
  handler = "VisitorCount.lambda_handler"
  layers  = []
  runtime = "python3.12"
  ephemeral_storage {
    size = 512
  }

  logging_config {
    log_format = "Text"
    log_group  = "/aws/lambda/VisitorCount"
  }

  tracing_config {
    mode = "PassThrough"
  }

  # Assuming your Lambda function code is stored in a zip file in S3
  s3_bucket = "www.chad-johnston.com"
  s3_key    = "scripts/lambda.zip"

  environment {
    variables = {
      TABLE_NAME = aws_dynamodb_table.visitor_count.name
    }
  }
}

# API Gateway HTTP API
resource "aws_apigatewayv2_api" "http_api" {
  name          = "VisitorCounter"
  protocol_type = "HTTP"
  cors_configuration {
    allow_credentials = false
    allow_headers = [
      "content-type",
    ]
    allow_methods = [
      "OPTIONS",
      "POST"
    ]
    allow_origins = [
      "https://www.chad-johnston.com"
    ]
    expose_headers = []
    max_age        = 3600
  }
}

# API Gateway Integration
resource "aws_apigatewayv2_integration" "lambda_integration" {
  api_id                 = aws_apigatewayv2_api.http_api.id
  integration_type       = "AWS_PROXY"
  integration_uri        = aws_lambda_function.visitor_count.invoke_arn
  integration_method     = "POST"
  payload_format_version = "2.0"
}

# API Gateway Route
resource "aws_apigatewayv2_route" "increment_route" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "POST /increment"
  target    = "integrations/${aws_apigatewayv2_integration.lambda_integration.id}"
}

data "aws_cloudwatch_log_group" "api_log_group" {
  name = "apilogs"
}

# API Gateway Stage
resource "aws_apigatewayv2_stage" "default_stage" {
  api_id      = aws_apigatewayv2_api.http_api.id
  name        = "$default"
  auto_deploy = true
  access_log_settings {
    destination_arn = data.aws_cloudwatch_log_group.api_log_group.arn
    format = jsonencode(
      {
        httpMethod     = "$context.httpMethod"
        ip             = "$context.identity.sourceIp"
        protocol       = "$context.protocol"
        requestId      = "$context.requestId"
        requestTime    = "$context.requestTime"
        responseLength = "$context.responseLength"
        routeKey       = "$context.routeKey"
        status         = "$context.status"
      }
    )
  }
}

# Lambda Permission for API Gateway
resource "aws_lambda_permission" "apigw_lambda" {
  statement_id  = "c570c8e0-daca-5a23-98aa-95d53027fb10"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.visitor_count.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.http_api.execution_arn}/*/*/increment"
}

# Output the API endpoint
output "api_endpoint" {
  value = aws_apigatewayv2_api.http_api.api_endpoint
}
