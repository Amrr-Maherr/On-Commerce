import mongoose from 'mongoose';

export async function connectDatabase() {
  const dbUrl = process.env.DB_URL;

  if (!dbUrl) {
    throw new Error('DB_URL is not defined');
  }

  await mongoose.connect(dbUrl);
  console.log('MongoDB connected');
}
