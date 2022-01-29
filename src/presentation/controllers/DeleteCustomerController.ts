import { DeleteCustomer } from "../../domain/use-cases/delete-customer";
import { noContent, serverError, notFound } from "../helpers/http-helper";
import { Controller } from "../protocols/controller";
import { HttpRequest, HttpResponse } from "../protocols/http";

export class DeleteCustomerController implements Controller {
  constructor (private readonly deleteCustomer: DeleteCustomer) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      console.log('httpRequest: ', httpRequest)
      const { document } = httpRequest.pathParameters
      const deleted = await this.deleteCustomer.delete(document)
      if (!deleted) return notFound()
      return noContent()
    } catch (error) {
      console.log('error at controller: ', error)
      return serverError(error as Error)
    }
  }
}