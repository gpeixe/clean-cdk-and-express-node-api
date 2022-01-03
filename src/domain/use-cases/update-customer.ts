import { Customer } from "../entities/customer"

export interface UpdateCustomer {
  update: (customer: Customer) => Promise<Customer | undefined>
}
