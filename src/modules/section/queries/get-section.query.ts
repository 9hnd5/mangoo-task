import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { GetSectionDTO } from 'src/modules/section/dtos/get-section.dto';
import SectionRepository from 'src/modules/section/section.repository';

export class GetSectionQuery {
  constructor(public id: number) {}
}
@QueryHandler(GetSectionQuery)
export class GetSectionQueryHandler implements IQueryHandler<GetSectionQuery, GetSectionDTO[]> {
  constructor(private sectionRepository: SectionRepository) {}
  async execute(query: GetSectionQuery): Promise<GetSectionDTO[]> {
    const { id } = query;
    const sections = await this.sectionRepository.findBy({ id });
    return plainToInstance(GetSectionDTO, sections, { excludeExtraneousValues: true });
  }
}
