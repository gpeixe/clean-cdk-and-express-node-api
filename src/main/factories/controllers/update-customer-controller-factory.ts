import { UpdateCustomerController } from "../../../presentation/controllers/UpdateCustomerController";
import { Controller } from "../../../presentation/protocols/controller";
import { makeUpdateCustomerUseCase } from "../use-cases/update-customer-factory";

export const makeUpdateCustomerController = (): Controller => {
  return new UpdateCustomerController(makeUpdateCustomerUseCase())
}