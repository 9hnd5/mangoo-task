import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { BaseCommandHandler } from 'mangoo-core';
import { Model } from 'mongoose';
import SectionRepository from 'src/modules/section/section.repository';
import { Task } from 'src/modules/task/entities/task.entity';
import { Task as TaskSchema, TaskDocument } from 'src/modules/task/schemas/task.schema';
import TaskRepository from 'src/modules/task/task.repository';
import { TaskService } from 'src/modules/task/task.service';
import { DataSource, IsNull } from 'typeorm';

export class CreateTaskCommand {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsNumber()
  sectionId: number;

  @IsOptional()
  @IsNumber()
  parentId: number | null = null;
}

@CommandHandler(CreateTaskCommand)
export class CreateTaskCommandHandler extends BaseCommandHandler implements ICommandHandler<CreateTaskCommand, number> {
  constructor(
    protected sectionRepository: SectionRepository,
    protected taskRepository: TaskRepository,
    protected taskService: TaskService,
    protected ds: DataSource,
    @InjectModel(TaskSchema.name) protected taskModel: Model<TaskDocument>,
  ) {
    super();
  }

  async execute(command: CreateTaskCommand): Promise<number> {
    const { sectionId, parentId } = command;

    let parent: Task | null = null;
    if (parentId) {
      parent = await this.taskRepository.findOneBy({ id: parentId });
      if (!parent) throw new NotFoundException('Parent not found');
    }

    const section = await this.sectionRepository.findOneBy({ id: sectionId });
    if (!section) throw new NotFoundException('Section not found');

    //create task mysql
    const createdById = this.request.user!.id;
    let order = 0;
    if (parent) {
      order = (await this.taskRepository.countBy({ parentId: parent.id })) + 1;
    } else {
      order = (await this.taskRepository.countBy({ sectionId: command.sectionId, parentId: IsNull() })) + 1;
    }
    const task = this.taskRepository.create({ ...command, order, createdById, parent });
    await this.taskRepository.save(task);

    //create task mongodb
    const taskDoc = {
      ...command,
      id: task.id,
      order: task.order,
      section: { id: section.id, name: section.name },
    };

    const taskModel = new this.taskModel(taskDoc);
    await taskModel.save();
    return task.id;
  }
}
