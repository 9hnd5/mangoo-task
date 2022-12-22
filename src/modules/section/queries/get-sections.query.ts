import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import SectionRepository from 'src/modules/section/section.repository';

export class GetSectionsQuery {}

@QueryHandler(GetSectionsQuery)
export class GetSectionsQueryHandler implements IQueryHandler {
  constructor(private sectionRepository: SectionRepository) {}

  execute(query: any): Promise<any> {
    return this.sectionRepository.findCache();
  }
}
