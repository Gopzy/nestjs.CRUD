import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TasksService } from './tasks.service';
import { MongooseModule } from '@nestjs/mongoose'
import { TaskSchema } from './tasks.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Task', schema: TaskSchema }])],
  controllers: [TaskController],
  providers: [TasksService],
})
export class TasksModule { }
