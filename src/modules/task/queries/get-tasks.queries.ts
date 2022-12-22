import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TaskDocument, Task } from 'src/modules/task/schemas/task.schema';

export class GetTasksQuery {
  constructor(public sectionId?: number) {}
}
@QueryHandler(GetTasksQuery)
export class GetTasksQueryHandler implements IQueryHandler<GetTasksQuery> {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}
  async execute(query: GetTasksQuery): Promise<any> {
    const { sectionId } = query;
    const result = await this.taskModel.find({ 'section.id': sectionId ? +sectionId : undefined }).exec();
    return result;
  }
}
