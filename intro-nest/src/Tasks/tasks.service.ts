import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './tasks.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TasksService {
  private Task: Task[] = [];

  constructor(@InjectModel('Task') private readonly taskModel: Model<Task>) {}

  async insertTasks(title: string, desc: string, date: Date) {
    // const taskId = Math.random().toString();
    const newTask = new this.taskModel({
      title: title,
      desc: desc,
      date: date,
    });
    // this.Task.push(newTask);
    const result = await newTask.save();
    // console.log(result);
    return result.id as string;
  }

  async getTasks() {
    const Tasks = await this.taskModel.find().exec();
    console.log(Tasks);

    return Tasks as Task[];
  }

  async getSingleTask(taskId: string) {
    const task = await this.findTask(taskId);
    return task;
  }

  async updateTask(taskID: string, title: string, desc: string, date: Date) {
    const updatedTask = await this.findTask(taskID);

    if (title) {
      updatedTask.title = title;
    }
    if (desc) {
      updatedTask.desc = desc;
    }
    if (date) {
      updatedTask.date = date;
    }
    updatedTask.save();
  }

  async deleteTask(taskID: string) {
    await this.taskModel.deleteOne({ _id: taskID }).exec();

    // const index = this.findTask(taskID)[1];
    // this.Task.splice(index, 1);
  }

  // Promise<Task>
  private findTask(Id: string) {
    const task = this.taskModel.findById(Id);
    if (!task) {
      throw new NotFoundException('Could not find the Task');
    }
    return task;
  }
}
