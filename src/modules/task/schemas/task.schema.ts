import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';
import { TaskPriority } from 'src/modules/task/enums/task-priority.enum';
import { TaskProgress } from 'src/modules/task/enums/task-progress.enum';

export class Assignee {
  @Prop()
  id: string;
  @Prop()
  name: string;
}
export class Project {
  @Prop()
  id: number;
  @Prop()
  name: string;
}
export class Section {
  @Prop()
  id: number;
  @Prop()
  name: string;
}

export type TaskDocument = HydratedDocument<Task>;

@Schema({ collection: 'task' })
export class Task {
  _id: ObjectId;
  @Prop()
  name: string;
  @Prop()
  id: number;
  @Prop()
  assignee: Assignee;
  @Prop()
  startDate?: Date;
  @Prop()
  endDate?: Date;
  @Prop()
  project?: Project;
  @Prop()
  section: Section;
  @Prop({ type: String, enum: TaskPriority })
  priority?: TaskPriority;
  @Prop({ type: String, enum: TaskProgress })
  progress?: TaskProgress;
  @Prop()
  description?: string;
  @Prop()
  isPublic: boolean;
  @Prop()
  isComplete: boolean;
  @Prop()
  order: number;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
