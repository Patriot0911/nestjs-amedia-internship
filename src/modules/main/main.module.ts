import { Module } from '@nestjs/common'
import { ScheduleModule } from '@nestjs/schedule'
import { TypeOrmModule } from '@nestjs/typeorm'

import { CategoryNewsController } from './controllers/category.controller'
import { CategoryNewsDataMapper } from './data-mappers/category.data-mapper'
import { NewsCatContentEntity } from './entities/newsCatContent.entity'
import { NewsCategoryEntity } from './entities/newsCategory.entity'
import { NewsContentEntity } from './entities/newsContent.entity'
import { NewsEntityDataFilter } from './filters/news.entity.filters'
import { CategoryNewsService } from './services/category.service'

import { NewsEntity } from 'src/modules/main/entities/news.entity'

import { NewsController } from 'src/modules/main/controllers/news.controller'

import { NewsService } from 'src/modules/main/services/news.service'

import { NewsDataMapper } from 'src/modules/main/data-mappers/news.data-mapper'

@Module({
  imports: [
    TypeOrmModule.forFeature([NewsEntity, NewsCategoryEntity, NewsContentEntity, NewsCatContentEntity]),
    ScheduleModule.forRoot(),
  ],
  controllers: [NewsController, CategoryNewsController],
  providers: [NewsService, NewsDataMapper, NewsEntityDataFilter, CategoryNewsDataMapper, CategoryNewsService],
})
export class MainModule {}
