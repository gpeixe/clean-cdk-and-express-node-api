import { DbUpdateCustomer } from "../../../data/use-cases/DbUpdateCustomer";
import { UpdateCustomer } from "../../../domain/use-cases/update-customer";
import { DynamoCustomerRepository } from "../../../infra/repositories/dynamo/dynamo-customer-repository";
import { MongoCustomerRepository } from "../../../infra/repositories/mongo/mongo-customer-repository";
import { UseCaseOptions } from "./protocols/options";

export const makeUpdateCustomerUseCase = (options: UseCaseOptions): UpdateCustomer => {
  let customerRepository
  if (options.repository === 'mongo') {
    customerRepository = new MongoCustomerRepository()
  } else {
    customerRepository = new DynamoCustomerRepository()
  }
  return new DbUpdateCustomer(customerRepository)
}