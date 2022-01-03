import { Customer } from "../../domain/entities/customer";

export interface LoadAllCustomersRepository  {
  loadAll: () => Promise<Customer[]>
}