import { Schema, model } from 'mongoose';

const HotlineSchema = new Schema({
  name:         { type: String, required: true },
  category:     { type: String, required: true },
  phone:        { type: String, required: true },
  location:     { type: String, required: true },
  availability: { type: String, required: true },
});

export const HotlineModel = model('Hotline', HotlineSchema);