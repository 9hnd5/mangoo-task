import Section from 'src/modules/task/entities/section.entity';
import { TaskPriority } from 'src/modules/task/enums/task-priority.enum';
import { TaskProgress } from 'src/modules/task/enums/task-progress.enum';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('task')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: String })
  name: string;
  @Column({ type: String, nullable: true })
  assigneeId?: string;
  @Column({ type: Date, nullable: true })
  startDate?: Date;
  @Column({ type: Date, nullable: true })
  endDate?: Date;
  @Column({ type: Number, nullable: true })
  projectId?: number;
  @Column({ type: Number, nullable: true })
  projectSectionId?: number;
  @Column({ type: 'enum', enum: TaskPriority, nullable: true })
  priority?: TaskPriority;
  @Column({ type: 'enum', enum: TaskProgress, nullable: true })
  progress?: TaskProgress;
  @Column({ type: String, nullable: true, length: 2000 })
  description?: string;
  @Column({ type: Boolean, default: false })
  isPublic: boolean;
  @Column({ type: Boolean, default: false })
  isComplete: boolean;
  @Column({ type: Number })
  order: number;
  @Column({ type: Number })
  sectionId: number;
  @ManyToOne(() => Section, (s) => s.tasks)
  @JoinColumn({ name: 'sectionId' })
  section: Section;
}
