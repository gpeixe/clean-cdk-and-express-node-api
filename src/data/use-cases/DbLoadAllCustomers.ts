import { Customer } from "../../domain/entities/customer";
import { LoadAllCustomers } from "../../domain/use-cases/load-all-customers";
import { LoadAllCustomersRepository } from "../protocols/load-all-customers-repository";

export class DbLoadAllCustomers implements LoadAllCustomers {
  constructor (private readonly loadAllCustomersRepository: LoadAllCustomersRepository) {}

  async loadAll (): Promise<Customer[]> {
    return await this.loadAllCustomersRepository.loadAll()
  }
}