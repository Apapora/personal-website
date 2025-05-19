data "aws_canonical_user_id" "current" {}

resource "aws_s3_bucket" "personal-site" {
  bucket = var.s3_site_bucket
}

resource "aws_s3_bucket_cors_configuration" "personal-site-cors" {
  bucket = aws_s3_bucket.personal-site.id

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["GET", "POST", "PUT"]
    allowed_origins = ["http://www.chad-johnston.com", "https://www.chad-johnston.com"]
    expose_headers  = ["x-amz-id-2", "x-amz-request-id", "x-amz-server-side-encryption"]
    max_age_seconds = "3000"
  }
}

resource "aws_s3_bucket_ownership_controls" "personal-site-oc" {
  bucket = aws_s3_bucket.personal-site.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_acl" "site-acl" {
    depends_on = [ aws_s3_bucket_ownership_controls.personal-site-oc ]

    bucket = aws_s3_bucket.personal-site.id
    access_control_policy {
      grant {
        grantee {
          id = data.aws_canonical_user_id.current.id
          type = "CanonicalUser"
        }
        permission = "FULL_CONTROL"
      }
      owner {
        id = data.aws_canonical_user_id.current.id
      }
    }
}

resource "aws_s3_bucket_policy" "site-bucket-policy" {
    bucket = aws_s3_bucket.personal-site.id
    policy = jsonencode({
        Version = "2012-10-17"
        Id      = "PolicyForCloudFrontPrivateContent"
        Statement = [
        {
            Sid      = "AllowCloudFrontServicePrincipal"
            Effect   = "Allow"
            Principal = {
            Service = "cloudfront.amazonaws.com"
            }
            Action   = "s3:GetObject"
            Resource = "arn:aws:s3:::${var.www_bucket_name}/*"
            Condition = {
            StringEquals = {
                "AWS:SourceArn" = "arn:aws:cloudfront::${var.account_id}:distribution/${var.cloudfront_distribution_id}"
            }
            }
        },
        {
            Sid      = "github"
            Effect   = "Allow"
            Principal = {
            AWS = "arn:aws:iam::${var.account_id}:user/${var.github_username}"
            }
            Action   = "s3:*"
            Resource = "arn:aws:s3:::${var.www_bucket_name}/*"
        }
        ]
    })
}

resource "aws_s3_bucket_request_payment_configuration" "site-pay-config" {
    bucket = aws_s3_bucket.personal-site.id
    payer  = "BucketOwner"
}

resource "aws_cloudfront_origin_access_control" "cloudfront-oac" {
  name                              = aws_s3_bucket.personal-site.bucket_regional_domain_name
  description                       = "Origin (S3) access control"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

resource "aws_cloudfront_distribution" "cloudfront" {
    origin {
        connection_attempts      = "3"
        connection_timeout       = "10"
        domain_name              = aws_s3_bucket.personal-site.bucket_regional_domain_name
        origin_access_control_id = aws_cloudfront_origin_access_control.cloudfront-oac.id
        origin_id                = aws_s3_bucket.personal-site.bucket_regional_domain_name
    }

    default_root_object = "index.html"
    enabled             = "true"
    http_version        = "http2"
    is_ipv6_enabled     = "true"

    aliases = ["chad-johnston.com", "www.chad-johnston.com"]

    logging_config {
        bucket          = var.s3_log_bucket
        include_cookies = "false"
        prefix          = "CF-"
    }

    default_cache_behavior {
        allowed_methods = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
        cached_methods  = ["GET", "HEAD"]
        compress        = "true"
        default_ttl     = "86400"
        cache_policy_id = "658327ea-f89d-4fab-a63d-7e88639e58f6"
        grpc_config {
            enabled = "false"
        }

        max_ttl                    = "31536000"
        min_ttl                    = "0"
        response_headers_policy_id = "6d05a639-85bb-4d59-a8ab-8c4689bcb813"
        smooth_streaming           = "false"
        target_origin_id           = aws_s3_bucket.personal-site.bucket_regional_domain_name
        viewer_protocol_policy     = "redirect-to-https"
    }

    custom_error_response {
        error_caching_min_ttl = "10"
        error_code            = "403"
        response_code         = "403"
        response_page_path    = "/index.html"
    }

    price_class = "PriceClass_100"

    restrictions {
        geo_restriction {
        restriction_type = "none"
        }
    }

    retain_on_delete = "false"
    staging          = "false"

    viewer_certificate {
        acm_certificate_arn            = var.acm_certificate_arn
        cloudfront_default_certificate = "false"
        minimum_protocol_version       = "TLSv1.2_2021"
        ssl_support_method             = "sni-only"
    }
}

resource "aws_route53_zone" "zone-cj-com" {
  comment       = "HostedZone created by Route53 Registrar"
  force_destroy = "false"
  name          = "chad-johnston.com"
}

resource "aws_route53_zone" "zone-www-cj-com" {
  force_destroy = "false"
  name          = "www.chad-johnston.com"
}

