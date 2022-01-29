import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb'

export const dynamoHelper = {
  client: null as unknown as DynamoDBDocumentClient,
  connect(): void {
    const client = new DynamoDBClient({})
    const documentClient = DynamoDBDocumentClient.from(client, { marshallOptions: { removeUndefinedValues: true }})
    this.client = documentClient
  },
  getClient(): DynamoDBDocumentClient { 
    if (!this.client) {
      this.connect()
    }
    return this.client
  }
}
