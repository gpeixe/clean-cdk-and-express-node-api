import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda'
import { adaptAPIGatewayProxyEventV2Route } from '../../../../../../../../../src/main/adapters/aws-api-gateway-proxy-event-v2-adapter'
import { makeUpdateCustomerController } from '../../../../../../../../../src/main/factories/controllers'
import { makeUpdateCustomerUseCase } from '../../../../../../../../../src/main/factories/use-cases'

export async function handler(
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> {
  const httpResponse = await adaptAPIGatewayProxyEventV2Route(event, makeUpdateCustomerController(makeUpdateCustomerUseCase({ repository: 'dynamo' })))
  return httpResponse
}

