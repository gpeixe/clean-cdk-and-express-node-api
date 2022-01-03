export interface DeleteCustomer {
  delete: (document: string) => Promise<boolean>
}