import { AddCustomer } from "../../../domain/use-cases/add-customer";
import { AddCustomerController } from "../../../presentation/controllers/AddCustomerController";
import { Controller } from "../../../presentation/protocols/controller";

export const makeAddCustomerController = (addCustomerUsecase: AddCustomer): Controller => {
  return new AddCustomerController(addCustomerUsecase)
}