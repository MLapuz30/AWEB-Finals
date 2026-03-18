import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { UserModel } from './user.model';

dotenv.config();

// ===== SET YOUR ADMIN CREDENTIALS HERE ======
const ADMIN_USERNAME = 'your_username';   // ← change this
const ADMIN_PASSWORD = 'your_password';   // ← change this

mongoose.connect(process.env.MONGO_URI!).then(async () => {
  console.log('Connected to MongoDB Atlas');
  const hashed = await bcrypt.hash(ADMIN_PASSWORD, 10);
  await UserModel.deleteMany({});
  await UserModel.create({ username: ADMIN_USERNAME, password: hashed });
  console.log(`Admin user "${ADMIN_USERNAME}" created successfully!`);
  process.exit(0);
}).catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});