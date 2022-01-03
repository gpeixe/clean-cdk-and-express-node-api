import { Customer } from "../entities/customer";

export interface LoadAllCustomers  {
  loadAll: () => Promise<Customer[]>
}