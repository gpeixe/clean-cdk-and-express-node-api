import { DeleteCustomer } from "../../domain/use-cases/delete-customer";
import { DeleteCustomerRepository } from "../protocols/delete-customer-repository";

export class DbDeleteCustomer implements DeleteCustomer {
  constructor (private readonly deleteCustomerRepository: DeleteCustomerRepository) {}

  async delete (document: string): Promise<boolean> {
    return await this.deleteCustomerRepository.delete(document)
  }
}