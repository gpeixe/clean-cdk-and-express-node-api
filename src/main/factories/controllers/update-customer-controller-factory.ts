import { UpdateCustomer } from "../../../domain/use-cases/update-customer";
import { UpdateCustomerController } from "../../../presentation/controllers/UpdateCustomerController";
import { Controller } from "../../../presentation/protocols/controller";

export const makeUpdateCustomerController = (updateCustomer: UpdateCustomer): Controller => {
  return new UpdateCustomerController(updateCustomer)
}