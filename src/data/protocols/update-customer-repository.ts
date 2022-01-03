import { Customer } from "../../domain/entities/customer";

export interface UpdateCustomerRepository {
  update: (customer: Customer) => Promise<Customer | undefined>
}
