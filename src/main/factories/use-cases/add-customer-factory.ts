import { DbAddCustomer } from "../../../data/use-cases/DbAddCustomer";
import { AddCustomer } from "../../../domain/use-cases/add-customer";
import { DynamoCustomerRepository } from "../../../infra/repositories/dynamo/DynamoCustomerRepository";

export const makeAddCustomerUseCase = (): AddCustomer => {
  const customerRepository = new DynamoCustomerRepository()
  return new DbAddCustomer(customerRepository)
}
