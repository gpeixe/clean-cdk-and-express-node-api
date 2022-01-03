import { Customer } from "../../domain/entities/customer";
import { UpdateCustomer } from "../../domain/use-cases/update-customer";
import { UpdateCustomerRepository } from "../protocols/update-customer-repository";

export class DbUpdateCustomer implements UpdateCustomer {
  constructor (private readonly updateCustomerRepository: UpdateCustomerRepository) {}

  async update(customer: Customer): Promise<Customer | undefined> {
    return await this.updateCustomerRepository.update(customer)
  }
}