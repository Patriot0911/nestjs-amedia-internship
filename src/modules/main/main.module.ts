import { Module } from '@nestjs/common'
import { ScheduleModule } from '@nestjs/schedule'
import { TypeOrmModule } from '@nestjs/typeorm'

import { NewsEntity } from 'src/modules/main/entities/news.entity'

import { NewsController } from 'src/modules/main/controllers/news.controller'

import { NewsService } from 'src/modules/main/services/news.service'

import { NewsDataMapper } from 'src/modules/main/data-mappers/news.data-mapper'

@Module({
  imports: [TypeOrmModule.forFeature([NewsEntity]), ScheduleModule.forRoot()],
  controllers: [NewsController],
  providers: [NewsService, NewsDataMapper],
})
export class MainModule {}
