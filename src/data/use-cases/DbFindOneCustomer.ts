import { Customer } from "@/domain/entities/customer";
import { FindOneCustomer } from "@/domain/use-cases/find-one-customer";
import { FindOneCustomerRepository } from "../protocols/find-one-customer-repository";

export class DbFindOneCustomer implements FindOneCustomer {
  constructor (private readonly findOneCustomerRepository: FindOneCustomerRepository) {}

  async findOne (document: string): Promise<Customer | undefined> {
    return await this.findOneCustomerRepository.findOne(document)
  }
}