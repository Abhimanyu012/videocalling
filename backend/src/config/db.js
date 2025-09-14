import mongoose from 'mongoose'

export const connectDB = async () => {
  const URI = process.env.MONGO_URI
  if (!URI) throw new Error('MONGO_URI is not set')
  mongoose.set('strictQuery', true)
  try {
    await mongoose.connect(URI, { autoIndex: true })
    console.log('MongoDB connected')
  } catch (error) {
    console.error('MongoDB connection error:', error)
    throw error
  }
}
