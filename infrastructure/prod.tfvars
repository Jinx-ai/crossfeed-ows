aws_region        = "us-west-2"
project           = "Crossfeed"
frontend_domain   = "crossfeed2.dds.mil"
api_domain        = "api.crossfeed2.dds.mil"
db_name           = "crossfeed-prod-db"
db_port           = 5432
db_table_name     = "cfproddb"
ssm_lambda_subnet = "/crossfeed/prod/SUBNET_ID"
ssm_lambda_sg     = "/crossfeed/prod/SG_ID"
ssm_db_name       = "/crossfeed/prod/DATABASE_NAME"
ssm_db_host       = "/crossfeed/prod/DATABASE_HOST"
ssm_db_username   = "/crossfeed/prod/DATABASE_USER"
ssm_db_password   = "/crossfeed/prod/DATABASE_PASSWORD"
ssm_user_pool     = "/crossfeed/prod/USER_POOL"
cloudfront_name   = "Crossfeed Prod Frontend"
db_group_name     = "crossfeed-prod-db-group"

user_pool = { name = "crossfeed-users", domain = "crossfeed", app_name = "prod_auth" }