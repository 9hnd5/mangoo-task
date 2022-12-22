import { Injectable } from '@nestjs/common';
import { redis } from 'src/main';
import Section from 'src/modules/task/entities/section.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export default class SectionRepository extends Repository<Section> {
  constructor(dataSource: DataSource) {
    super(Section, dataSource.createEntityManager());
  }

  async findCache() {
    const cacheData = await redis.get('sections');
    if (cacheData) {
      return JSON.parse(cacheData) as Section;
    }
    const sections = await this.find();
    redis.set('sections', JSON.stringify(sections));
    return sections;
  }
}
