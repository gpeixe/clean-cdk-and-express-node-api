import { DbDeleteCustomer } from "../../../data/use-cases/DbDeleteCustomer";
import { DeleteCustomer } from "../../../domain/use-cases/delete-customer";
import { DynamoCustomerRepository } from "../../../infra/repositories/dynamo/dynamo-customer-repository";
import { MongoCustomerRepository } from "../../../infra/repositories/mongo/mongo-customer-repository";
import { UseCaseOptions } from "./protocols/options";

export const makeDeleteCustomerUseCase = (options: UseCaseOptions): DeleteCustomer => {
  let customerRepository
  if (options.repository === 'mongo') {
    customerRepository = new MongoCustomerRepository()
  } else {
    customerRepository = new DynamoCustomerRepository()
  }
  return new DbDeleteCustomer(customerRepository)
}