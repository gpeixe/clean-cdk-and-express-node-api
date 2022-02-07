import { FindOneCustomerRepository } from '../../../data/protocols/find-one-customer-repository'
import { Collection } from 'mongodb'
import { AddCustomerRepository } from '../../../data/protocols/add-customer-repository'
import { DeleteCustomerRepository } from '../../../data/protocols/delete-customer-repository'
import { LoadAllCustomersRepository } from '../../../data/protocols/load-all-customers-repository'
import { UpdateCustomerRepository } from '../../../data/protocols/update-customer-repository'
import { Customer } from '../../../domain/entities/customer'
import { MongoHelper } from './mongo-helper'

export class MongoCustomerRepository implements AddCustomerRepository, UpdateCustomerRepository, LoadAllCustomersRepository, DeleteCustomerRepository, FindOneCustomerRepository {
  private async getCustomersCollection (): Promise<Collection> {
    return await MongoHelper.getCollection('customers')
  }

  async add (customer: Customer): Promise<boolean> {
    const collection = await this.getCustomersCollection()
    const result = await collection.insertOne(Object.assign({}, customer))
    return result.acknowledged
  }

  async loadAll (): Promise<Customer[]> {
    const collection = await this.getCustomersCollection()
    const customers = await collection.find().toArray()
    return customers && MongoHelper.mapCollection(customers)
  }

  async delete (document: string): Promise<boolean> {
    const collection = await this.getCustomersCollection()
    const result = await collection.deleteOne({ document })
    return result.deletedCount === 1
  }

  async findOne (document: string): Promise<Customer | undefined> {
    const collection = await this.getCustomersCollection()
    const customer  = await collection.findOne({ document })
    return customer && MongoHelper.map(customer)
  }

  async update (customer: Customer): Promise<Customer | undefined> {
    const { document, ...rest } = customer
    const collection = await this.getCustomersCollection()
    const updated = (await collection.updateOne({ document }, { $set: rest })).matchedCount === 1
    if (!updated) return undefined
    const newCustomer = await this.findOne(document)
    return newCustomer
  }
}
