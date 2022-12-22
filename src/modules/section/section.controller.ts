import { Controller, Get } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetSectionsQuery } from 'src/modules/section/queries/get-sections.query';

@Controller('sections')
export class SectionController {
  constructor(private queryBus: QueryBus) {}

  @Get()
  getSections() {
    return this.queryBus.execute(new GetSectionsQuery());
  }
}
