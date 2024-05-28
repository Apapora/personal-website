import json
import boto3
from decimal import Decimal

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('VisitorCount')

def lambda_handler(event, context):
    try:
        http_method = event["requestContext"]["http"]["method"]
        if http_method == 'POST':
            body = json.loads(event.get('body', '{}'))
            page = body.get('page')

            if not page:
                return {
                    'statusCode': 400,
                    'headers': {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': 'Content-Type',
                        'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
                    },
                    'body': json.dumps({'error': 'Missing "page" in request body'})
                }

            response = table.update_item(
                Key={'page': page},
                UpdateExpression='SET visitorCount = if_not_exists(visitorCount, :start) + :inc',
                ExpressionAttributeValues={
                    ':inc': Decimal(1),
                    ':start': Decimal(0)
                },
                ReturnValues='UPDATED_NEW'
            )

            new_count = int(response['Attributes']['visitorCount'])

            return {
                'statusCode': 200,
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
                },
                'body': json.dumps({'message': 'Visitor count incremented', 'new_count': new_count})
            }
        else:
            return {
                'statusCode': 405,
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
                },
                'body': json.dumps({'error': 'Method not allowed'})
            }

    except Exception as e:
        print(f"Error: {e}")
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
            },
            'body': json.dumps({'error': 'Internal server error', 'message': str(e)})
        }
