import Section from 'src/modules/task/entities/section.entity';
import { TaskPriority } from 'src/modules/task/enums/task-priority.enum';
import { TaskProgress } from 'src/modules/task/enums/task-progress.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Tree,
  UpdateDateColumn,
} from 'typeorm';

@Entity('task')
@Tree('adjacency-list')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String })
  name: string;

  @Column({ type: String, nullable: true, default: null })
  assigneeId: string | null;

  @Column({ type: Date, nullable: true, default: null })
  startDate: Date | null;

  @Column({ type: Date, nullable: true, default: null })
  endDate: Date | null;

  @Column({ type: Number, nullable: true, default: null })
  projectId: number | null;

  @Column({ type: Number, nullable: true, default: null })
  projectSectionId: number | null;

  @Column({ type: 'enum', enum: TaskPriority, nullable: true, default: null })
  priority: TaskPriority | null;

  @Column({ type: 'enum', enum: TaskProgress, nullable: true, default: null })
  progress: TaskProgress | null;

  @Column({ type: String, nullable: true, default: null, length: 2000 })
  description: string | null;

  @Column({ type: Boolean, default: false })
  isPublic: boolean;

  @Column({ type: Boolean, default: false })
  isComplete: boolean;

  @Column({ type: Number })
  order: number;

  @Column({ type: Number })
  sectionId: number;

  @Column({ type: Number, nullable: true, default: null })
  parentId: number | null;

  @Column()
  createdById: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @ManyToOne(() => Section, (s) => s.tasks)
  @JoinColumn({ name: 'sectionId' })
  section: Section;

  @ManyToOne((t) => Task, (t) => t.children, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'parentId' })
  parent: Task | null;

  @OneToMany((t) => Task, (t) => t.parent)
  children: Task[] | null;

  // @TreeParent({ onDelete: 'CASCADE' })
  // parent: Task | null;

  // @TreeChildren()
  // children: Task[] | null;
}
