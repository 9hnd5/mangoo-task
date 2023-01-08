import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Allow, IsNotEmpty, IsNumber } from 'class-validator';
import { Model } from 'mongoose';
import { Task, TaskDocument } from 'src/modules/task/schemas/task.schema';
import TaskRepository from 'src/modules/task/task.repository';

export class SortTaskCommand {
  @IsNotEmpty()
  @IsNumber()
  activeId: number;
  @IsNotEmpty()
  @IsNumber()
  overId: number;
}

@CommandHandler(SortTaskCommand)
export class SortTaskCommandHandler implements ICommandHandler<SortTaskCommand> {
  constructor(private taskRepository: TaskRepository, @InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}
  async execute(command: SortTaskCommand): Promise<any> {
    const { activeId, overId } = command;
    await this.swapTask(activeId, overId);
    await this.swapTaskDoc(activeId, overId);
    return;
  }

  private async swapTask(activeId: number, overId: number) {
    const task1 = await this.taskRepository.findOne({
      where: { id: activeId },
    });
    const task2 = await this.taskRepository.findOne({
      where: { id: overId },
    });
    if (task1 && task2) {
      const order1 = task1.order;
      task1.order = task2.order;
      task2.order = order1;
      await this.taskRepository.save([task1, task2]);
    }
  }
  private async swapTaskDoc(activeId: number, overId: number) {
    const task1 = await this.taskModel.findOne({ id: activeId }).exec();
    const task2 = await this.taskModel.findOne({ id: overId }).exec();
    if (task1 && task2) {
      const order1 = task1.order;
      task1.order = task2.order;
      task2.order = order1;
      return this.taskModel.bulkSave([task1, task2]);
    }
  }
}
