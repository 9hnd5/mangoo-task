import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { GetSectionQueryHandler } from 'src/modules/section/queries/get-section.query';
import { GetSectionsQueryHandler } from 'src/modules/section/queries/get-sections.query';
import { SectionController } from 'src/modules/section/section.controller';
import SectionRepository from 'src/modules/section/section.repository';

@Module({
  imports: [CqrsModule],
  controllers: [SectionController],
  providers: [SectionRepository, GetSectionsQueryHandler, GetSectionQueryHandler],
})
export class SectionModule {}
