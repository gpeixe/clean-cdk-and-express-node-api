import express from 'express'
import customerRoutes from '../routes/customers-routes'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())
customerRoutes(app)

export default app