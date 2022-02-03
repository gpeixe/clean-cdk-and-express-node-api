import { Controller, HttpRequest } from '../../presentation/protocols'
import { Request, Response, RequestHandler } from 'express'

export const adaptExpressRoute = (controller: Controller): RequestHandler => {
  return async (req: Request, res: Response) => {
    console.log('req: ', req)
    const httpRequest: HttpRequest = {
      body: req.body,
      pathParameters: req.params 
    }
    const httpResponse = await controller.handle(httpRequest)
    const statusCode = httpResponse.statusCode
    res.status(statusCode).json(httpResponse.body)
  }
}