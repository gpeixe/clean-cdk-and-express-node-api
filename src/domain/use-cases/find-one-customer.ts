import { Customer } from "../entities/customer";

export interface FindOneCustomer {
    findOne: (document: string) => Promise<Customer | undefined>
}
