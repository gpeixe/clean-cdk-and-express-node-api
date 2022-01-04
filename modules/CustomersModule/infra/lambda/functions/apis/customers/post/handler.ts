import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda'
import { adaptAPIGatewayProxyEventV2Route } from '../../../../../../../../src/main/adapters/aws-api-gateway-proxy-event-v2-adapter'
import { makeAddCustomerController } from '../../../../../../../../src/main/factories/controllers/add-customer-controller-factory'
import { makeAddCustomerUseCase } from '../../../../../../../../src/main/factories/use-cases/add-customer-factory'

export async function handler(
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> {
  const httpResponse = await adaptAPIGatewayProxyEventV2Route(event, makeAddCustomerController(makeAddCustomerUseCase({ repository: 'dynamo' })))
  return httpResponse
}

