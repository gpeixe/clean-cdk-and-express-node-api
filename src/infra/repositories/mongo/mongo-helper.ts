import { MongoClient, Collection } from 'mongodb'
import env from '../../../main/config/env'

export const MongoHelper = {
  client: null as unknown as MongoClient,
  uri: env.mongoUrl,

  async connect(): Promise<void> {
    this.client = await MongoClient.connect(this.uri)
  },

  async disconnect(): Promise<void> {
    await this.client.close()
  },

  async getCollection(name: string): Promise<Collection> {
    if (!this.client) {
      await this.connect()
    }
    return this.client.db().collection(name)
  },

  map(data: any): any {
    const { _id, ...rest } = data
    return { ...rest }
  },

  mapCollection: (collection: any[]): any[] => {
    return collection.map(c => MongoHelper.map(c))
  }
}