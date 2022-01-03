import { Customer } from "../../domain/entities/customer";
import { AddCustomer } from "../../domain/use-cases/add-customer";
import { AddCustomerRepository } from "../protocols/add-customer-repository";

export class DbAddCustomer implements AddCustomer {
  constructor (private readonly addCustomerRepository: AddCustomerRepository) {}

  async add (customer: Customer): Promise<boolean> {
    return await this.addCustomerRepository.add(customer)
  }
}