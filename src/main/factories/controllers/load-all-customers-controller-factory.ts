import { LoadAllCustomers } from "../../../domain/use-cases/load-all-customers";
import { LoadAllCustomersController } from "../../../presentation/controllers/LoadAllCustomersController";
import { Controller } from "../../../presentation/protocols/controller";

export const makeLoadAllCustomersController = (loadAllCustomers: LoadAllCustomers): Controller => {
  return new LoadAllCustomersController(loadAllCustomers)
}