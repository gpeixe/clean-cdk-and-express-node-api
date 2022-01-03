import { Customer } from "../entities/customer";

export interface AddCustomer {
  add: (customer: Customer) => Promise<boolean>
}