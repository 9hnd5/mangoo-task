import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sequence')
export default class Sequence {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: String })
  name: string;
  @Column({ type: Number })
  current: number;
}
