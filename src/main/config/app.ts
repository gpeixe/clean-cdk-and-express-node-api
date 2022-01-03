import setupRoutes from './routes'
import express = require('express')

const app = express()
setupRoutes(app)

export default app