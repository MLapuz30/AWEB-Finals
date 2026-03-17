import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { HotlineModel } from './hotline.model';
 
dotenv.config();
 
const hotlines = [
  // Police
  { name: 'Angeles City Police Station',               category: 'Police',    phone: '(045) 888-2345', location: 'Angeles City',                  availability: '24/7' },
  { name: 'Police Station 1 - Balibago',               category: 'Police',    phone: '(045) 322-4567', location: 'Balibago, Angeles City',         availability: '24/7' },
  { name: 'Police Station 2 - Nepo Quad',              category: 'Police',    phone: '(045) 888-7890', location: 'Nepo Quad, Angeles City',        availability: '24/7' },
  { name: 'Police Station 3 - Clarkfield',             category: 'Police',    phone: '(045) 599-2100', location: 'Clark Freeport Zone',            availability: '24/7' },
  // Fire
  { name: 'Bureau of Fire Protection - Angeles City',  category: 'Fire',      phone: '(045) 888-2222', location: 'Angeles City',                  availability: '24/7' },
  { name: 'BFP Fire Station - Clark',                  category: 'Fire',      phone: '(045) 599-5911', location: 'Clark Freeport Zone',            availability: '24/7' },
  { name: 'BFP Fire Station - Mabalacat',              category: 'Fire',      phone: '(045) 331-1234', location: 'Mabalacat City',                availability: '24/7' },
  // Hospital
  { name: 'Angeles University Foundation Medical Center', category: 'Hospital', phone: '(045) 625-1000', location: 'Angeles City',               availability: '24/7' },
  { name: 'Ospital Ning Angeles',                      category: 'Hospital',  phone: '(045) 888-4551', location: 'Angeles City',                  availability: '24/7' },
  { name: 'St. Francis Medical Center',                category: 'Hospital',  phone: '(045) 892-3888', location: 'Angeles City',                  availability: '24/7' },
  // Ambulance
  { name: 'Red Cross - Pampanga Chapter',              category: 'Ambulance', phone: '(045) 536-4636', location: 'Angeles City',                  availability: '24/7' },
  { name: 'Angeles City Rescue Unit',                  category: 'Ambulance', phone: '(045) 322-5678', location: 'Angeles City',                  availability: '24/7' },
  { name: 'CDRRMO - Clark Development',                category: 'Ambulance', phone: '(045) 599-2222', location: 'Clark Freeport Zone',            availability: '24/7' },
  // Barangay
  { name: 'Barangay Hall - Balibago',                  category: 'Barangay',  phone: '(045) 322-1122', location: 'Balibago, Angeles City',        availability: 'Mon-Sat 8am-5pm' },
  { name: 'Barangay Hall - Anunas',                    category: 'Barangay',  phone: '(045) 888-3344', location: 'Anunas, Angeles City',          availability: 'Mon-Sat 8am-5pm' },
  { name: 'Barangay Hall - Cutcut',                    category: 'Barangay',  phone: '(045) 888-5566', location: 'Cutcut, Angeles City',          availability: 'Mon-Sat 8am-5pm' },
];
 
mongoose.connect(process.env.MONGO_URI!)
  .then(async () => {
    console.log('Connected to MongoDB Atlas');
    await HotlineModel.deleteMany({});
    await HotlineModel.insertMany(hotlines);
    console.log('Seeded 16 hotlines successfully!');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Seed error:', err);
    process.exit(1);
  });