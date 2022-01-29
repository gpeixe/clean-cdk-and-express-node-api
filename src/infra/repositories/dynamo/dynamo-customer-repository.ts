import { DeleteCommand, GetCommand, PutCommand, UpdateCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { AddCustomerRepository } from "../../../data/protocols/add-customer-repository";
import { DeleteCustomerRepository } from "../../../data/protocols/delete-customer-repository";
import { LoadAllCustomersRepository } from "../../../data/protocols/load-all-customers-repository";
import { UpdateCustomerRepository } from "../../../data/protocols/update-customer-repository";
import { Customer } from "../../../domain/entities/customer";
import { dynamoHelper } from "./dynamo-helper";

export class DynamoCustomerRepository implements AddCustomerRepository, DeleteCustomerRepository, LoadAllCustomersRepository, UpdateCustomerRepository {
  private client;
  private TABLE_NAME = 'customers'

  constructor() {
    this.client =  dynamoHelper.getClient()
  }

  async add (customer: Customer): Promise<boolean> {
   const queryCustomerByDocumentResult = await this.client.send(
     new GetCommand({
      TableName: this.TABLE_NAME,
      Key: { document: customer.document }
   }))
    const userAlreadyExists = queryCustomerByDocumentResult.Item !== undefined
    if (userAlreadyExists) return false
    await this.client.send(
      new PutCommand({
        TableName: this.TABLE_NAME,
        Item: customer 
    }))
    return true
  }

  async delete (document: string): Promise<boolean> {
    const deleteResult = await this.client.send(new DeleteCommand({
      TableName: this.TABLE_NAME,
      Key: { document }
    }))
    console.log('DeleteResult: ', JSON.stringify(deleteResult))
    return true
  }

  async loadAll (): Promise<Customer[]> {
    const scanResult = await this.client.send(new ScanCommand({ TableName: this.TABLE_NAME }))
    const customers = scanResult.Items ? scanResult.Items as unknown as Customer[] : [] as Customer[]
    return customers
  }
  
  async update (customer: Customer): Promise<Customer | undefined> {
    const attributesValues: any = {}
    const attributesNames: any = {}

    let updateExpression: any = "SET"

    if (customer.loyaltyPoints !== undefined) {
      attributesNames["#LP"] = "loyaltyPoints"
      attributesValues[":lp"] = customer.loyaltyPoints
      updateExpression += " #LP = :lp,"
    }

    if (customer.age !== undefined) {
      attributesNames["#AGE"] = "age"
      attributesValues[":age"] = customer.age
      updateExpression += " #AGE = :age,"
    }
      
    if (customer.name !== undefined) {
      attributesValues[":nm"] = customer.name 
      attributesNames["#NM"] = "name"
      updateExpression += " #NM = :nm,"
    }
    
    updateExpression = updateExpression.split('')
    updateExpression.pop()
    updateExpression = updateExpression.join('')

    const updateResult = await this.client.send(new UpdateCommand({
      ExpressionAttributeNames: attributesNames, 
      ExpressionAttributeValues: attributesValues, 
      Key: { document: customer.document },
      ReturnValues: "ALL_NEW", 
      TableName: this.TABLE_NAME, 
      UpdateExpression: updateExpression
     }))
    console.log('UpdateResult: ', JSON.stringify(updateResult))
    return updateResult.Attributes as Customer
  }
}