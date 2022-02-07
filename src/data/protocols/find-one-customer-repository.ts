import { Customer } from "../../domain/entities/customer";

export interface FindOneCustomerRepository {
    findOne: (document: string) => Promise<Customer | undefined>
}