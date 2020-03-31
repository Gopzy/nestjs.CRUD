import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TaskController {
  constructor(private readonly TasksService: TasksService) {}

  @Post()
  async addTask(
    @Body('title') taskTitle: string,
    @Body('desc') taskDesc: string,
    @Body('date') taskDate: Date,
  ) {
    const generatedID = await this.TasksService.insertTasks(
      taskTitle,
      taskDesc,
      taskDate,
    );
    return { id: generatedID };
  }
  @Get()
  async getAllTasks() {
    const tasks = await this.TasksService.getTasks();
    return tasks;
  }
  @Get(':id')
  getTask(@Param('id') taskId: string) {
    return this.TasksService.getSingleTask(taskId);
  }
  @Patch(':id')
  async updateTask(
    @Param('id') taskId: string,
    @Body('title') taskTitle: string,
    @Body('desc') taskDesc: string,
    @Body('date') date: Date,
  ) {
    await this.TasksService.updateTask(taskId, taskTitle, taskDesc, date);
    return null;
  }

  @Delete(':id')
  async removeTask(@Param('id') taskId: string) {
    await this.TasksService.deleteTask(taskId);
    return null;
  }
}
