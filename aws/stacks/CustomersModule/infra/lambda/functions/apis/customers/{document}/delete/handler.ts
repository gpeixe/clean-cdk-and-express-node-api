import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda'
import { adaptAPIGatewayProxyEventV2Route } from '../../../../../../../../../../src/main/adapters/aws-api-gateway-proxy-event-v2-adapter'
import { makeDeleteCustomerController } from '../../../../../../../../../../src/main/factories/controllers'
import { makeDeleteCustomerUseCase } from '../../../../../../../../../../src/main/factories/use-cases'

export async function handler(
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> {
  const httpResponse = await adaptAPIGatewayProxyEventV2Route(event, makeDeleteCustomerController(makeDeleteCustomerUseCase({ repository: 'dynamo' })))
  return httpResponse
}

