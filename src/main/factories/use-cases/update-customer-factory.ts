import { DbUpdateCustomer } from "../../../data/use-cases/DbUpdateCustomer";
import { UpdateCustomer } from "../../../domain/use-cases/update-customer";
import { DynamoCustomerRepository } from "../../../infra/repositories/dynamo/DynamoCustomerRepository";

export const makeUpdateCustomerUseCase = (): UpdateCustomer => {
  const customerRepository = new DynamoCustomerRepository()
  return new DbUpdateCustomer(customerRepository)
}