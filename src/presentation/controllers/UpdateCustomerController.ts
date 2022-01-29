import { Customer } from "../../domain/entities/customer";
import { UpdateCustomer } from "../../domain/use-cases/update-customer";
import { MissingParamError } from "../errors/missing-param-error";
import { ok, serverError, notFound, badRequest } from "../helpers/http-helper";
import { Controller } from "../protocols/controller";
import { HttpRequest, HttpResponse } from "../protocols/http";

export class UpdateCustomerController implements Controller {
  constructor (private readonly updateCustomer: UpdateCustomer) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      console.log('httpRequest: ', httpRequest)
      const { name, age, loyaltyPoints } = httpRequest.body
      const { document } = httpRequest.pathParameters
      if (name === undefined && age === undefined && loyaltyPoints === undefined)
        return badRequest(new MissingParamError('name, age or loyaltyPoints.'))
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
      console.log('error at controller: ', error)
      return serverError(error as Error)
    }
  }
}