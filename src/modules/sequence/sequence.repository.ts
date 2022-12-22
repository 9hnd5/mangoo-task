import { Injectable } from '@nestjs/common';
import Sequence from 'src/modules/task/entities/sequence.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export default class SequenceRepository {
  private repository: Repository<Sequence>;
  constructor(private dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(Sequence);
  }

  async findNext(name: string) {
    const seq = await this.repository.findOne({ where: { name } });
    if (seq) {
      const next = seq.current + 1;
      seq.current++;
      this.repository.save(seq);
      return next;
    }
    return 0;
  }
}
