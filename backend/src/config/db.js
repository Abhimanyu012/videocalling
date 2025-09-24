import mongoose from 'mongoose'

export const connectDB = async () => {
  const URI = process.env.MONGO_URI
  if (!URI) throw new Error('MONGO_URI is not set')
  mongoose.set('strictQuery', true)
  try {
    const conn = await mongoose.connect(URI)
    console.log(`MongoDb connected: ${conn.connection.host}`)
  } catch (error) {
    console.error('MongoDB connection ERROR:', error)
    throw error
  }
}
