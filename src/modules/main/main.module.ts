import { Module } from '@nestjs/common'
import { ScheduleModule } from '@nestjs/schedule'
import { TypeOrmModule } from '@nestjs/typeorm'

import { NewsController } from './controllers/news.controller'
import { NewsService } from './services/news.service'
import { NewsDataMapper } from './data-mappers/news.data-mapper'
import { NewsEntity } from './entities/news.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([NewsEntity]),
    ScheduleModule.forRoot()
  ],
  controllers: [NewsController],
  providers: [NewsService, NewsDataMapper],
})
export class MainModule {}
