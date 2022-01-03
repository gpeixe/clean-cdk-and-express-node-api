import { LoadAllCustomersRepository } from "../../../data/protocols/load-all-customers-repository";
import { DbLoadAllCustomers } from "../../../data/use-cases/DbLoadAllCustomers";
import { DynamoCustomerRepository } from "../../../infra/repositories/dynamo/DynamoCustomerRepository";

export const makeLoadAllCustomersUseCase = (): LoadAllCustomersRepository => {
  const customerRepository = new DynamoCustomerRepository()
  return new DbLoadAllCustomers(customerRepository)
}