import * as mongoose from 'mongoose';
import { Interface } from 'readline';

export const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  date: { type: Date, required: true },
});

export interface Task extends mongoose.Document {
  id: String;
  title: String;
  desc: String;
  date: Date;
}
