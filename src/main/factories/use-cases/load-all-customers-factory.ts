import { LoadAllCustomersRepository } from "../../../data/protocols/load-all-customers-repository";
import { DbLoadAllCustomers } from "../../../data/use-cases/DbLoadAllCustomers";
import { DynamoCustomerRepository } from "../../../infra/repositories/dynamo/dynamo-customer-repository";
import { MongoCustomerRepository } from "../../../infra/repositories/mongo/mongo-customer-repository";
import { UseCaseOptions } from "./protocols/options";

export const makeLoadAllCustomersUseCase = (options: UseCaseOptions): LoadAllCustomersRepository => {
  let customerRepository
  if (options.repository === 'mongo') {
    customerRepository = new MongoCustomerRepository()
  } else {
    customerRepository = new DynamoCustomerRepository()
  }
  return new DbLoadAllCustomers(customerRepository)
}