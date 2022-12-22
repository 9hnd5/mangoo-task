import { HttpService } from '@nestjs/axios';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { firstValueFrom } from 'rxjs';
import SectionRepository from 'src/modules/section/section.repository';
import { Task } from 'src/modules/task/entities/task.entity';
import { TaskPriority } from 'src/modules/task/enums/task-priority.enum';
import { TaskProgress } from 'src/modules/task/enums/task-progress.enum';
import { Task as TaskSchema, TaskDocument } from 'src/modules/task/schemas/task.schema';
import TaskRepository from 'src/modules/task/task.repository';

export class UpdateTaskCommand {
  id: number;
  name: string;
  assigneeId?: string;
  startDate?: Date;
  endDate?: Date;
  projectId?: number;
  sectionId: number;
  priority?: TaskPriority;
  progress?: TaskProgress;
  description?: string;
}

@CommandHandler(UpdateTaskCommand)
export class UpdateTaskCommandHandler implements ICommandHandler<UpdateTaskCommand> {
  constructor(
    private taskRepo: TaskRepository,
    private httpService: HttpService,
    private sectionRepository: SectionRepository,
    @InjectModel(TaskSchema.name) private taskModel: Model<TaskDocument>,
  ) {}
  async execute(command: UpdateTaskCommand): Promise<any> {
    const task = await this.taskRepo.findOneBy({ id: command.id });
    if (task) {
      task.name = command.name;
      task.assigneeId = command.assigneeId;
      task.startDate = command.startDate;
      task.endDate = command.endDate;
      task.projectId = command.projectId;
      task.sectionId = command.sectionId;
      task.priority = command.priority;
      task.progress = command.progress;
      task.description = command.description;
      await this.taskRepo.save(task);
      return this.updateTaskDoc(task);
    }
    throw new Error('Method not implemented.');
  }
  private async updateTaskDoc(task: Task) {
    const { data } = await firstValueFrom(this.httpService.get(`http://localhost:3002/users/${task.assigneeId}`));
    const assignee = { id: data._id, name: `${data.firstName} ${data.lastName}` };
    const section = await this.sectionRepository.findOne({
      where: { id: task.sectionId },
    });
    const project = task.projectId ? { id: task.projectId, name: 'Test Project' } : undefined;
    const taskDoc = await this.taskModel.findOne({ id: task.id }).exec();
    if (taskDoc && section) {
      taskDoc.name = task.name;
      taskDoc.assignee = assignee;
      taskDoc.startDate = task.startDate;
      taskDoc.endDate = task.endDate;
      taskDoc.project = project;
      taskDoc.section = { id: section.id, name: section.name };
      taskDoc.priority = task.priority;
      taskDoc.progress = task.progress;
      taskDoc.description = task.description;
      return taskDoc.save();
    }
  }
}
