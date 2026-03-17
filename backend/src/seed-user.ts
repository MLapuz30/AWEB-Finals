import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { UserModel } from './user.model';

dotenv.config();

mongoose.connect(process.env.MONGO_URI!).then(async () => {
  const hashed = await bcrypt.hash('', 10);
  await UserModel.deleteMany({});
  await UserModel.create({ username: '', password: hashed });
  console.log('Admin user created!');
  process.exit(0);
});