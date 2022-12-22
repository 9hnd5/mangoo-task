import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SectionModule } from 'src/modules/section/section.module';
import TaskModule from 'src/modules/task/task.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TaskModule,
    SectionModule,
    MongooseModule.forRoot("mongodb://taskService:taskService@localhost:27017/task-service"),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'task-service',
      entities: [__dirname + '/modules/**/**.entity.{ts,js}'],
      synchronize: false,
      retryAttempts: 3,
      retryDelay: 1000,
      entitySkipConstructor: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
