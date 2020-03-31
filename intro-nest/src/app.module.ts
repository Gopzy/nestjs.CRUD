import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './Tasks/tasks.module';
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [TasksModule, MongooseModule.forRoot('mongodb+srv://gopy:task123@cluster0-irvjr.mongodb.net/nestjs-demo?retryWrites=true&w=majority')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
