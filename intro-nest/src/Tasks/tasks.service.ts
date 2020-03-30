import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './tasks.model';

@Injectable()
export class TasksService {
  private Task: Task[] = [];

  insertTasks(title: string, desc: string, date: Date) {
    const taskId = Math.random().toString();
    const newTask = new Task(taskId, title, desc, date);
    this.Task.push(newTask);
    return taskId;
  }

  getTasks() {
    return [...this.Task];
  }

  getSingleTask(taskId: string) {
    const task = this.findTask(taskId)[0];
    return { ...task };
  }

  updateTask(
    taskID: string,
    title: string,
    desc: string,
    date: Date,
  ) {
    const [task, index] = this.findTask(taskID);
    const updatedTask = { ...task };

    if (title) {
      updatedTask.title = title;
    }
    if (desc) {
      updatedTask.desc = desc;
    }
    if (date) {
      updatedTask.date = date;
    }
    this.Task[index] = updatedTask;
  }

  deleteTask(taskID: string) {
    const index = this.findTask(taskID)[1];
    this.Task.splice(index, 1)

  }

  private findTask(taskId: string): [Task, number] {
    const taskIndex = this.Task.findIndex(tsk => tsk.id === taskId);
    const task = this.Task[taskIndex];
    if (!task) {
      throw new NotFoundException('Could not find the Task');
    }
    return [task, taskIndex];
  }


}
