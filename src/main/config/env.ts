export default {
  port: process.env.PORT || 8080,
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/clean-cdk'
}
