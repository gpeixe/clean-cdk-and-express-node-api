import { DbDeleteCustomer } from "../../../data/use-cases/DbDeleteCustomer";
import { DeleteCustomer } from "../../../domain/use-cases/delete-customer";
import { DynamoCustomerRepository } from "../../../infra/repositories/dynamo/DynamoCustomerRepository";

export const makeDeleteCustomerUseCase = (): DeleteCustomer => {
  const customerRepository = new DynamoCustomerRepository()
  return new DbDeleteCustomer(customerRepository)
}