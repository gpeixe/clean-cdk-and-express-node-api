import { DeleteCustomer } from "../../../domain/use-cases/delete-customer";
import { DeleteCustomerController } from "../../../presentation/controllers/DeleteCustomerController";
import { Controller } from "../../../presentation/protocols/controller";

export const makeDeleteCustomerController = (deleteCustomerUseCase: DeleteCustomer): Controller => {
  return new DeleteCustomerController(deleteCustomerUseCase)
}