import { AddCustomerRepository } from "../../../data/protocols/add-customer-repository";
import { DeleteCustomerRepository } from "../../../data/protocols/delete-customer-repository";
import { LoadAllCustomersRepository } from "../../../data/protocols/load-all-customers-repository";
import { UpdateCustomerRepository } from "../../../data/protocols/update-customer-repository";
import * as AWS from 'aws-sdk';
import { DynamoDB } from "aws-sdk";
import { Customer } from "../../../domain/entities/customer";

export class DynamoCustomerRepository implements AddCustomerRepository, DeleteCustomerRepository, LoadAllCustomersRepository, UpdateCustomerRepository {
  private client: DynamoDB;
  private TABLE_NAME = 'Customers'

  constructor() {
    this.client =  new AWS.DynamoDB();
  }

  async add (customer: Customer): Promise<boolean> {
   const queryCustomerByDocumentResult = await this.client.query({
      TableName: this.TABLE_NAME,
      ExpressionAttributeValues: {
        ":doc": {
          S: customer.document
         }
       }, 
      KeyConditionExpression: "document = :doc", 
    }).promise()
    const userAlreadyExists = queryCustomerByDocumentResult.Items?.length !== 0
    if (userAlreadyExists) return false
    await this.client.putItem({
      TableName: this.TABLE_NAME,
      Item: { 
        name : { S: customer.name },
        age: { N: customer.age.toString() },
        document: { S: customer.document },
        loyaltyPoints: { S: customer.loyaltyPoints.toString() }
      }
    }).promise()
    return true
  }

  async delete (document: string): Promise<boolean> {
    const params = {
      Key: {
       "document": {
         S: document
        },
      }, 
      TableName: this.TABLE_NAME
     };
    const deleteResult = await this.client.deleteItem(params).promise()
    console.log('DeleteResult: ', JSON.stringify(deleteResult))
    return true
  }

  async loadAll (): Promise<Customer[]> {
    const scanResult = await this.client.scan({ TableName: this.TABLE_NAME }).promise()
    const customers = scanResult.Items ? scanResult.Items as Customer[] : [] as Customer[]
    return customers
  }
  
  async update (customer: Customer): Promise<Customer | undefined> {
    const attributesValues: any = {}
    const attributesNames: any = {}

    let updateExpression: any = "SET"

    if (customer.loyaltyPoints !== undefined) {
      attributesNames["#LP"] = "loyaltyPoints"
      attributesValues[":lp"] = { N: customer.loyaltyPoints.toString() }
      updateExpression += " #LP = #:lp,"
    }

    if (customer.age !== undefined) {
      attributesNames["#AGE"] = "age"
      attributesValues[":age"] = { N: customer.age.toString() }
      updateExpression += " #AGE = #:age,"
    }
      
    if (customer.name !== undefined) {
      attributesValues[":nm"] = { S: customer.name }
      attributesNames["#NM"] = "name"
      updateExpression += " #NM = #:nm,"
    }
    
    updateExpression = updateExpression.split('')
    updateExpression.pop()
    updateExpression = updateExpression.join('')

    const params = {
      ExpressionAttributeNames: attributesNames, 
      ExpressionAttributeValues: attributesValues, 
      Key: {
       "document": {
         S: customer.document
        }
      }, 
      ReturnValues: "ALL_NEW", 
      TableName: this.TABLE_NAME, 
      UpdateExpression: updateExpression
     };

    const updateResult = await this.client.updateItem(params).promise()
    console.log('UpdateResult: ', JSON.stringify(updateResult))
    return updateResult.$response.data as Customer
  }
}