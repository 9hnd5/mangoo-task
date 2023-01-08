import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';
import { Model } from 'mongoose';
import { Task, TaskDocument } from 'src/modules/task/schemas/task.schema';
import { isEmpty } from 'lodash';

export class GetTasksQuery {
  @IsOptional()
  @IsInt()
  @Transform(({ value }) => +value)
  sectionId?: number;

  @IsOptional()
  @IsInt()
  @Transform(({ value }) => +value)
  parentId?: number;
}
@QueryHandler(GetTasksQuery)
export class GetTasksQueryHandler implements IQueryHandler<GetTasksQuery> {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}
  async execute(query: GetTasksQuery): Promise<any> {
    const { sectionId, parentId } = query;
    let filter: any = { parentId };

    if (sectionId) {
      filter = { ...filter, 'section.id': sectionId };
    }
    if (parentId) {
      filter = { ...filter, parentId };
    } else {
      filter = { ...filter, parentId: null };
    }

    if (isEmpty(filter)) return [];

    const result = await this.taskModel.find(filter).exec();

    return result;
  }
}
