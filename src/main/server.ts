import env from './config/env'
import app from './config/app'
import { MongoHelper } from '../infra/repositories/mongo/mongo-helper'

MongoHelper.connect().then(() => {
  app.listen(env.port, () => console.log(`Running at http://localhost:${env.port}`))
}).catch((e) => console.log('error: ', e))

