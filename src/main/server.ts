import env from './config/env'
import app from './config/app'

app.listen(env.port, () => console.log(`Running at http://localhost:${env.port}`))