import { HttpService } from '@nestjs/axios';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { firstValueFrom } from 'rxjs';
import SectionRepository from 'src/modules/section/section.repository';
import { TaskPriority } from 'src/modules/task/enums/task-priority.enum';
import { TaskProgress } from 'src/modules/task/enums/task-progress.enum';
import { Task as TaskSchema, TaskDocument } from 'src/modules/task/schemas/task.schema';
import TaskRepository from 'src/modules/task/task.repository';

export class CreateTaskCommand {
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

@CommandHandler(CreateTaskCommand)
export class CreateTaskCommandHandler implements ICommandHandler<CreateTaskCommand> {
  constructor(
    private sectionRepository: SectionRepository,
    private taskRepository: TaskRepository,
    private httpService: HttpService,
    @InjectModel(TaskSchema.name) private taskModel: Model<TaskDocument>,
  ) {}
  async execute(command: CreateTaskCommand): Promise<any> {
    const { sectionId, ...rest } = command;
    const section = await this.sectionRepository.findOneBy({ id: sectionId });
    if (section) {
      const order = (await this.taskRepository.countBy({ sectionId })) + 1;
      const task = this.taskRepository.create({ ...rest, section, order });
      await this.taskRepository.save(task);
      const { data } = await firstValueFrom(this.httpService.get(`http://localhost:3002/users/${task.assigneeId}`));
      const assignee = { id: data._id, name: `${data.firstName} ${data.lastName}` };
      const project = task.projectId ? { id: task.projectId, name: 'Test Project' } : undefined;
      const taskDoc = { ...task, assignee, project };
      const taskModel = new this.taskModel(taskDoc);
      taskModel.save();
    }
  }
}
