import { Customer } from "../../domain/entities/customer";
import { UpdateCustomer } from "../../domain/use-cases/update-customer";
import { ok, serverError, notFound } from "../helpers/http-helper";
import { Controller } from "../protocols/controller";
import { HttpRequest, HttpResponse } from "../protocols/http";

export class UpdateCustomerController implements Controller {
  constructor (private readonly updateCustomer: UpdateCustomer) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { name, age, loyaltyPoints } = httpRequest.body
      const { document } = httpRequest.pathParameters
      const customer: Customer = {
        document,
        name,
        age,
        loyaltyPoints
      }
      const updatedCustomer = await this.updateCustomer.update(customer)
      if (!updatedCustomer)
        return notFound()
      return ok(updatedCustomer)
    } catch (error) {
      return serverError(error as Error)
    }
  }
}