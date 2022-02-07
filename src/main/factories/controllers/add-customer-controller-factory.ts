import { FindOneCustomer } from "../../../domain/use-cases/find-one-customer";
import { AddCustomer } from "../../../domain/use-cases/add-customer";
import { AddCustomerController } from "../../../presentation/controllers/AddCustomerController";
import { Controller } from "../../../presentation/protocols/controller";

export const makeAddCustomerController = (addCustomerUseCase: AddCustomer, findOneCustomerUseCase: FindOneCustomer): Controller => {
  return new AddCustomerController(addCustomerUseCase, findOneCustomerUseCase)
}