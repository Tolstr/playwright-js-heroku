import json
import boto3

def lambda_handler(event, context):
    print("Event: ", json.dumps(event))  # Logs to CloudWatch

    # Get file name from event
    bucket = event['Records'][0]['s3']['bucket']['name']
    key    = event['Records'][0]['s3']['object']['key']

    s3 = boto3.client('s3')
    file = s3.get_object(Bucket=bucket, Key=key)
    content = file['Body'].read().decode('utf-8')

    print(f"File '{key}' content:\n{content}")

    return {
        'statusCode': 200,
        'body': f"Processed file: {key}"
    }
