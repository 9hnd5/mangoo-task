import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';
import { TaskPriority } from 'src/modules/task/enums/task-priority.enum';
import { TaskProgress } from 'src/modules/task/enums/task-progress.enum';

export class Assignee {
  @Prop()
  id: string;
  @Prop()
  firstName: string;
  @Prop()
  lastName: string;
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

  @Prop({ unique: true })
  id: number;

  @Prop({ type: Assignee, default: null })
  assignee: Assignee | null;

  @Prop({ type: Project, default: null })
  project: Project | null;

  @Prop({ type: Date, default: null })
  startDate: Date | null;

  @Prop({ type: Date, default: null })
  endDate: Date | null;

  @Prop()
  section: Section;

  @Prop({ type: String, enum: [...Object.values(TaskProgress), null], default: null })
  priority: TaskPriority | null;

  @Prop({ type: String, enum: [...Object.values(TaskProgress), null], default: null })
  progress: TaskProgress | null;

  @Prop({ type: String, default: null })
  description: string | null;

  @Prop()
  isPublic: boolean;

  @Prop()
  isComplete: boolean;

  @Prop()
  order: number;

  @Prop({ type: Number, default: null })
  parentId: number | null;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
