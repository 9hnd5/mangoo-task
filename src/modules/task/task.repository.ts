import { Injectable } from '@nestjs/common';
import { Task } from 'src/modules/task/entities/task.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export default class TaskRepository extends Repository<Task> {
  constructor(dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }
}
