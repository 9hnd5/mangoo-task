import { Controller, Get, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetSectionQuery } from 'src/modules/section/queries/get-section.query';
import { GetSectionsQuery } from 'src/modules/section/queries/get-sections.query';

@Controller('sections')
export class SectionController {
  constructor(private queryBus: QueryBus) {}

  @Get()
  getSections() {
    return this.queryBus.execute(new GetSectionsQuery());
  }

  @Get(':id')
  getSection(@Param('id') id: number) {
    return this.queryBus.execute(new GetSectionQuery(id));
  }
}
