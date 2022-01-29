import { LoadAllCustomers } from "../../domain/use-cases/load-all-customers";
import { noContent, serverError, ok } from "../helpers/http-helper";
import { Controller } from "../protocols/controller";
import { HttpRequest, HttpResponse } from "../protocols/http";

export class LoadAllCustomersController implements Controller {
  constructor (private readonly loadAllCustomers: LoadAllCustomers) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      console.log('httpRequest: ', httpRequest)
      const customers = await this.loadAllCustomers.loadAll()
      if (customers.length === 0) return noContent()
      return ok(customers)
    } catch (error) {
      console.log('error at controller: ', error)
      return serverError(error as Error)
    }
  }
}