import { Customer } from "../../domain/entities/customer";
import { AddCustomer } from "../../domain/use-cases/add-customer";
import { MissingParamError } from "../errors/missing-param-error";
import { badRequest, forbidden, serverError, created } from "../helpers/http-helper";
import { Controller, HttpRequest, HttpResponse } from "../protocols";

export class AddCustomerController implements Controller {
  constructor (private readonly addCustomer: AddCustomer) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['document', 'name', 'age']
      for (const field of requiredFields) {
        if (httpRequest.body[field] === undefined) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { document, name, age } = httpRequest.body
      const customer: Customer = {
        document,
        name,
        age,
        loyaltyPoints: 0
      }
      const success = await this.addCustomer.add(customer)
      if (!success)
        return forbidden(new Error('Customer with document provided already exists.'))
      return created(customer)
    } catch (error) {
      return serverError(error as Error)
    }
  }
}