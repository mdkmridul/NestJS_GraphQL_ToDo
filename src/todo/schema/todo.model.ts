import * as mongoose from 'mongoose';

export const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
  },
  description: String,
  completed: { type: Boolean, default: false },
  date: {
    type: Date,
    default: Date.now(),
  },
  user: String,
});

export interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  date: Date;
  user: string
};
