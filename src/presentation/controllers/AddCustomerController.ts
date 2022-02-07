import { FindOneCustomer } from "../../domain/use-cases/find-one-customer";
import { Customer } from "../../domain/entities/customer";
import { UserAlreadyExistsError } from "../../domain/errors/UserAlreadyExistsError";
import { AddCustomer } from "../../domain/use-cases/add-customer";
import { MissingParamError } from "../errors/missing-param-error";
import { badRequest, forbidden, serverError, created } from "../helpers/http-helper";
import { Controller, HttpRequest, HttpResponse } from "../protocols";

export class AddCustomerController implements Controller {
  constructor (
    private readonly addCustomer: AddCustomer,
    private readonly findOneCustomer: FindOneCustomer
    ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      console.log('httpRequest: ', httpRequest)
      const requiredFields = ['document', 'name', 'age']
      for (const field of requiredFields) {
        if (httpRequest.body[field] === undefined) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { document, name, age } = httpRequest.body
      const customerAlreadyExists = await this.findOneCustomer.findOne(document)
      if (customerAlreadyExists) return forbidden(new UserAlreadyExistsError())
      const customer: Customer = {
        document,
        name,
        age,
        loyaltyPoints: 0
      }
      await this.addCustomer.add(customer)
      return created(customer)
    } catch (error) {
      console.log('error at controller: ', error)
      return serverError(error as Error)
    }
  }
}