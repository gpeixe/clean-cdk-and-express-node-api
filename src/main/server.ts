import { MongoHelper } from '../infra/repositories/mongo/mongo-helper'
import env from './config/env'

console.log('env: ', env)
MongoHelper.connect()
  .then(async () => {
    const app = (await import('./config/app')).default
    app.listen(env.port, () => console.log(`Running at http://localhost:${env.port}`))
  })
  .catch(console.error) 