import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  age: Number,
});

export interface User {
  id: string;
  name: string;
  email: string;
  age: number;
};
