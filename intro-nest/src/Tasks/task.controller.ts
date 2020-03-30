import { Controller, Post, Get, Body, Param, Patch, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TaskController {
  constructor(private readonly TasksService: TasksService) { }

  @Post()
  addTask(
    @Body('title') taskTitle: string,
    @Body('desc') taskDesc: string,
    @Body('date') taskDate: Date,
  ): any {
    const generatedID = this.TasksService.insertTasks(
      taskTitle,
      taskDesc,
      taskDate,
    );
    return { id: generatedID };
  }
  @Get()
  getAllTasks() {
    return this.TasksService.getTasks();
  }
  @Get(':id')
  getTask(@Param('id') taskId: string) {
    return this.TasksService.getSingleTask(taskId);
  }
  @Patch(':id')
  updateTask(
    @Param('id') taskId: string,
    @Body('title') taskTitle: string,
    @Body('desc') taskDesc: string,
    @Body('date') date: Date,
  ) {
    this.TasksService.updateTask(taskId, taskTitle, taskDesc, date);
    return null;
  }

  @Delete(':id')
  removeTask(@Param('id') taskId: string) {
    this.TasksService.deleteTask(taskId);
    return null;
  }

}
