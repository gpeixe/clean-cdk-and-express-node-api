import { Customer } from "../../domain/entities/customer";

export interface AddCustomerRepository {
  add: (customer: Customer) => Promise<boolean>
}