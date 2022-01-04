import { DbAddCustomer } from "../../../data/use-cases/DbAddCustomer";
import { AddCustomer } from "../../../domain/use-cases/add-customer";
import { DynamoCustomerRepository } from "../../../infra/repositories/dynamo/dynamo-customer-repository";
import { MongoCustomerRepository } from "../../../infra/repositories/mongo/mongo-customer-repository";
import { UseCaseOptions } from "./protocols/options";

export const makeAddCustomerUseCase = (options: UseCaseOptions): AddCustomer => {
  let customerRepository
  if (options.repository === 'mongo') {
    customerRepository = new MongoCustomerRepository()
  } else {
    customerRepository = new DynamoCustomerRepository()
  }
  return new DbAddCustomer(customerRepository)
}
