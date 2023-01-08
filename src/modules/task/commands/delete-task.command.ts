import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from 'src/modules/task/schemas/task.schema';
import TaskRepository from 'src/modules/task/task.repository';

export class DeleteTaskCommand {
  constructor(public id: number) {}
}

@CommandHandler(DeleteTaskCommand)
export class DeleteTaskCommandHandler implements ICommandHandler<DeleteTaskCommand, number> {
  constructor(private taskRepo: TaskRepository, @InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}
  async execute(command: DeleteTaskCommand): Promise<number> {
    const { id } = command;
    const task = await this.taskRepo.findOneBy({ id });

    if (!task) throw new NotFoundException('Task not found');

    await this.taskRepo.remove(task);

    //Get the tree
    const result = await this.taskModel
      .aggregate()
      .match({ id })
      .graphLookup({
        from: 'task',
        startWith: '$id',
        connectFromField: 'id',
        connectToField: 'parentId',
        as: 'subTasks',
      })
      .project({
        id,
        subTaskIds: {
          $map: {
            input: '$subTasks',
            as: 'subTask',
            in: '$$subTask.id',
          },
        },
      })
      .project({
        ids: {
          $concatArrays: [['$id'], '$subTaskIds'],
        },
      })
      .exec();

    result.length && (await this.taskModel.deleteMany({ id: { $in: result[0].ids } }));

    return id;
  }
}
