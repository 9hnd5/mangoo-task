import { Task } from 'src/modules/task/entities/task.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('section')
export default class Section {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: String })
  name: string;
  @OneToMany(() => Task, (t) => t.section, { orphanedRowAction: 'delete' })
  tasks: Task;
}
