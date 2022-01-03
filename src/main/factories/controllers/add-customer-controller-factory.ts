import { AddCustomerController } from "../../../presentation/controllers/AddCustomerController";
import { Controller } from "../../../presentation/protocols/controller";
import { makeAddCustomerUseCase } from "../use-cases/add-customer-factory";

export const makeAddCustomerController = (): Controller => {
  return new AddCustomerController(makeAddCustomerUseCase())
}