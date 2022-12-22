import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { GetSectionsQueryHandler } from 'src/modules/section/queries/get-sections.query';
import { SectionController } from 'src/modules/section/section.controller';
import SectionRepository from 'src/modules/section/section.repository';

@Module({
  imports: [CqrsModule],
  controllers: [SectionController],
  providers: [SectionRepository, GetSectionsQueryHandler],
})
export class SectionModule {}
