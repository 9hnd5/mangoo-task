import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { IsBoolean, IsDateString, IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { BaseCommandHandler } from 'mangoo-core';
import { Model } from 'mongoose';
import SectionRepository from 'src/modules/section/section.repository';
import { TaskPriority } from 'src/modules/task/enums/task-priority.enum';
import { TaskProgress } from 'src/modules/task/enums/task-progress.enum';
import { Task as TaskSchema, TaskDocument } from 'src/modules/task/schemas/task.schema';
import TaskRepository from 'src/modules/task/task.repository';
import { TaskService } from 'src/modules/task/task.service';

export class UpdateTaskCommand {
  id: number;

  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsMongoId()
  assigneeId: string | null = null;

  @IsOptional()
  @IsDateString()
  startDate: Date | null = null;

  @IsOptional()
  @IsDateString()
  endDate: Date | null = null;

  @IsOptional()
  @IsNumber()
  projectId: number | null = null;

  @IsOptional()
  @IsNumber()
  sectionId: number;

  @IsOptional()
  @IsEnum(TaskPriority)
  priority: TaskPriority | null = null;

  @IsOptional()
  @IsEnum(TaskProgress)
  progress: TaskProgress | null = null;

  @IsOptional()
  @IsNumber()
  parentId: number | null = null;

  @IsOptional()
  @IsNotEmpty()
  description: string | null = null;
}

@CommandHandler(UpdateTaskCommand)
export class UpdateTaskCommandHandler extends BaseCommandHandler implements ICommandHandler<UpdateTaskCommand, number> {
  constructor(
    private sectionRepository: SectionRepository,
    private taskRepository: TaskRepository,
    private taskService: TaskService,
    @InjectModel(TaskSchema.name) private taskModel: Model<TaskDocument>,
  ) {
    super();
  }
  async execute(command: UpdateTaskCommand): Promise<number> {
    const { id, sectionId, projectId, assigneeId, parentId } = command;

    let task = await this.taskRepository.findOneBy({ id });
    if (!task) throw new NotFoundException('Task not found');

    if (parentId) {
      const parent = await this.taskRepository.findOneBy({ id: parentId });
      if (!parent) throw new NotFoundException('Parent not found');
    }

    const section = await this.sectionRepository.findOneBy({ id: sectionId });
    if (!section) throw new NotFoundException('Section not found');

    const project = projectId ? await this.taskService.getProject(projectId) : undefined;
    const assignee = assigneeId ? await this.taskService.getAssign(assigneeId) : undefined;

    //Update task mysql
    task = { ...task, ...command };
    await this.taskRepository.save(task);

    //Update task mongodb
    await this.taskModel.findOneAndUpdate(
      { id: task.id },
      {
        name: task.name,
        assignee: { id: assignee?.id, firstName: assignee?.firstName, lastName: assignee?.lastName },
        startDate: task.startDate,
        endDate: task.endDate,
        project: { id: project?.id, name: project?.name },
        section: { id: section.id, name: section.name },
        priority: task.priority,
        progress: task.progress,
        parentId: parentId,
        description: task.description,
      },
    );

    return task.id;
  }
}

export class UpdateTaskPartial {
  id: number;

  @IsOptional()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  isComplete: boolean;
}

@CommandHandler(UpdateTaskPartial)
export class UpdateTaskPartialCommandHandler
  extends BaseCommandHandler
  implements ICommandHandler<UpdateTaskPartial, number>
{
  constructor(
    private sectionRepository: SectionRepository,
    private taskRepository: TaskRepository,
    private taskService: TaskService,
    @InjectModel(TaskSchema.name) private taskModel: Model<TaskDocument>,
  ) {
    super();
  }
  async execute(command: UpdateTaskPartial): Promise<number> {
    const { id, name, isComplete } = command;
    let task = await this.taskRepository.findOneBy({ id });
    if (!task) throw new NotFoundException('Task not found');

    //Update task mysql
    task.name = name;
    task.isComplete = isComplete;
    await this.taskRepository.save(task);

    //Update task mongodb
    await this.taskModel.findOneAndUpdate(
      { id: task.id },
      {
        name: task.name,
        isComplete: isComplete,
      },
    );

    return task.id;
  }
}
