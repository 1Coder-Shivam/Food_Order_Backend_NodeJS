import mongoose from 'mongoose';
import { MONGO_URI } from '../config';

export default async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to Database successfully');
  } catch (ex) {
    console.error('Error connecting to the database:', ex);
  }
};
