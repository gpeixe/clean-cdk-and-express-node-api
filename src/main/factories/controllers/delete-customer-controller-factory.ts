import { DeleteCustomerController } from "../../../presentation/controllers/DeleteCustomerController";
import { Controller } from "../../../presentation/protocols/controller";
import { makeDeleteCustomerUseCase } from "../use-cases/delete-customer-factory";

export const makeDeleteCustomerController = (): Controller => {
  return new DeleteCustomerController(makeDeleteCustomerUseCase())
}