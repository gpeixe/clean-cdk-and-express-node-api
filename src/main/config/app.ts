import express from 'express'
import customerRoutes from '../routes/customers-routes'

const app = express()
customerRoutes(app)
export default app