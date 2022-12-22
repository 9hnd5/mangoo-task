import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from 'src/modules/task/schemas/task.schema';
import TaskRepository from 'src/modules/task/task.repository';

export class DeleteTaskCommand {
  constructor(public id: number) {}
}

@CommandHandler(DeleteTaskCommand)
export class DeleteTaskCommandHandler implements ICommandHandler<DeleteTaskCommand> {
  constructor(private taskRepo: TaskRepository, @InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}
  async execute(command: DeleteTaskCommand): Promise<any> {
    const { id } = command;
    const task = await this.taskRepo.findOneBy({ id });
    if (task) {
      await this.taskRepo.remove(task);
      return this.taskModel.deleteOne({ id });
    }
    throw new Error('Method not implemented.');
  }
}
