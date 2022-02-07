import { DbFindOneCustomer } from "../../../data/use-cases/DbFindOneCustomer";
import { FindOneCustomer } from "../../../domain/use-cases/find-one-customer";
import { DynamoCustomerRepository } from "../../../infra/repositories/dynamo/dynamo-customer-repository";
import { MongoCustomerRepository } from "../../../infra/repositories/mongo/mongo-customer-repository";
import { UseCaseOptions } from "./protocols/options";

export const makeFindOneCustomerUseCase = (options: UseCaseOptions): FindOneCustomer => {
  let customerRepository
  if (options.repository === 'mongo') {
    customerRepository = new MongoCustomerRepository()
  } else {
    customerRepository = new DynamoCustomerRepository()
  }
  return new DbFindOneCustomer(customerRepository)
}