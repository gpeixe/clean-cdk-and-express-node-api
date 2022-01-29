import { Controller, HttpRequest } from '../../presentation/protocols'
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda'

export const adaptAPIGatewayProxyEventV2Route = async (req: APIGatewayProxyEventV2, controller: Controller) => {
  const httpRequest: HttpRequest = {
    body: req.body && JSON.parse(req.body) || {},
    pathParameters: req.pathParameters || {},
  }
  const httpResponse = await controller.handle(httpRequest)
  const body = httpResponse.body ? JSON.stringify(httpResponse.body) : null
  return {
    statusCode: httpResponse.statusCode,
    body: body,
    headers: {
      'Allow-Access-Control-Origin': '*'
    }
  } as APIGatewayProxyResultV2
}
