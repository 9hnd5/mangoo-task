import { Injectable } from '@nestjs/common';
import { Task } from 'src/modules/task/entities/task.entity';
import { DataSource, TreeRepository } from 'typeorm';

@Injectable()
export default class TaskRepository extends TreeRepository<Task> {
  constructor(dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }
}
