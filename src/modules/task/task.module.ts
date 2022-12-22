import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import SectionRepository from 'src/modules/section/section.repository';
import SequenceRepository from 'src/modules/sequence/sequence.repository';
import { CreateTaskCommandHandler } from 'src/modules/task/commands/create-task.command';
import { DeleteTaskCommandHandler } from 'src/modules/task/commands/delete-task.command';
import { SortTaskCommandHandler } from 'src/modules/task/commands/sort-task.command';
import { UpdateTaskCommandHandler } from 'src/modules/task/commands/update-task.command';
import { GetTasksQueryHandler } from 'src/modules/task/queries/get-tasks.queries';
import { Task, TaskSchema } from 'src/modules/task/schemas/task.schema';
import TaskController from 'src/modules/task/task.controller';
import TaskRepository from 'src/modules/task/task.repository';

@Module({
  imports: [CqrsModule, HttpModule, MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }])],
  controllers: [TaskController],
  providers: [
    TaskRepository,
    SectionRepository,
    SequenceRepository,
    CreateTaskCommandHandler,
    UpdateTaskCommandHandler,
    DeleteTaskCommandHandler,
    SortTaskCommandHandler,
    GetTasksQueryHandler,
  ],
})
export default class TaskModule {}
