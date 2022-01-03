import { LoadAllCustomersController } from "../../../presentation/controllers/LoadAllCustomersController";
import { Controller } from "../../../presentation/protocols/controller";
import { makeLoadAllCustomersUseCase } from "../use-cases/load-all-customers-factory";

export const makeLoadAllCustomersController = (): Controller => {
  return new LoadAllCustomersController(makeLoadAllCustomersUseCase())
}