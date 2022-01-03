export interface DeleteCustomerRepository {
  delete: (document: string) => Promise<boolean>
}