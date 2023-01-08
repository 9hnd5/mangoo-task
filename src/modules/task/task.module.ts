import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from 'mangoo-core';
import SectionRepository from 'src/modules/section/section.repository';
import SequenceRepository from 'src/modules/sequence/sequence.repository';
import { CreateTaskCommandHandler } from 'src/modules/task/commands/create-task.command';
import { DeleteTaskCommandHandler } from 'src/modules/task/commands/delete-task.command';
import { SortTaskCommandHandler } from 'src/modules/task/commands/sort-task.command';
import {
  UpdateTaskCommandHandler, UpdateTaskPartialCommandHandler
} from 'src/modules/task/commands/update-task.command';
import { GetTasksQueryHandler } from 'src/modules/task/queries/get-tasks.query';
import { Task, TaskSchema } from 'src/modules/task/schemas/task.schema';
import TaskController from 'src/modules/task/task.controller';
import TaskRepository from 'src/modules/task/task.repository';
import { TaskService } from 'src/modules/task/task.service';
import { ValidAssignee } from 'src/modules/task/validations/valid-assignee.validation';
import { ValidProject } from 'src/modules/task/validations/valid-project.validation';

const commandHandlers = [
  CreateTaskCommandHandler,
  UpdateTaskCommandHandler,
  UpdateTaskPartialCommandHandler,
  DeleteTaskCommandHandler,
  SortTaskCommandHandler,
  GetTasksQueryHandler,
];
const repositories = [TaskRepository, SectionRepository, SequenceRepository];

@Module({
  imports: [
    CqrsModule,
    HttpModule.register({ injectToken: true }),
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
  ],
  controllers: [TaskController],
  providers: [TaskService, ValidAssignee, ValidProject, ...repositories, ...commandHandlers],
})
export default class TaskModule {}
