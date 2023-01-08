import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Authorize } from 'mangoo-core';
import { CreateTaskCommand } from 'src/modules/task/commands/create-task.command';
import { DeleteTaskCommand } from 'src/modules/task/commands/delete-task.command';
import { SortTaskCommand } from 'src/modules/task/commands/sort-task.command';
import { UpdateTaskCommand, UpdateTaskPartial } from 'src/modules/task/commands/update-task.command';
import { GetTasksQuery } from 'src/modules/task/queries/get-tasks.query';
@Controller('tasks')
class TaskController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @Authorize('admin')
  @Get()
  async getTasks(@Query() query: GetTasksQuery) {
    const tasks = await this.queryBus.execute(query);
    return tasks.sort((a, b) => a.order - b.order);
  }

  @Patch()
  async sortTask(@Body() command: SortTaskCommand) {
    return this.commandBus.execute(command);
  }

  @Authorize('admin')
  @Post()
  createTask(@Body() command: CreateTaskCommand) {
    return this.commandBus.execute(command);
  }

  @Authorize('admin')
  @Put(':id')
  updateTask(@Body() command: UpdateTaskCommand, @Param('id') id: number) {
    command.id = id;
    return this.commandBus.execute(command);
  }

  @Authorize('admin')
  @Patch(':id')
  updateTaskPartial(@Body() command: UpdateTaskPartial, @Param('id') id: number) {
    command.id = id;
    return this.commandBus.execute(command);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: number) {
    return this.commandBus.execute(new DeleteTaskCommand(id));
  }
}

export default TaskController;
