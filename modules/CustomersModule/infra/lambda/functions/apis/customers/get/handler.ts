import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda'
import { adaptAPIGatewayProxyEventV2Route } from '../../../../../../../../src/main/adapters/aws-api-gateway-proxy-event-v2-adapter'
import { makeLoadAllCustomersController } from '../../../../../../../../src/main/factories/controllers/load-all-customers-controller-factory'
import { makeLoadAllCustomersUseCase } from '../../../../../../../../src/main/factories/use-cases/load-all-customers-factory'

export async function handler(
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> {
  const httpResponse = await adaptAPIGatewayProxyEventV2Route(event, makeLoadAllCustomersController(makeLoadAllCustomersUseCase({ repository: 'dynamo' })))
  return httpResponse
}

