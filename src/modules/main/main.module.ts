import { Module } from '@nestjs/common'
import { ScheduleModule } from '@nestjs/schedule'
import { TypeOrmModule } from '@nestjs/typeorm'

import { NewsEntityDataFilter } from './filters/news.entity.filters'

import { NewsEntity } from 'src/modules/main/entities/news.entity'

import { NewsController } from 'src/modules/main/controllers/news.controller'

import { NewsService } from 'src/modules/main/services/news.service'

import { NewsDataMapper } from 'src/modules/main/data-mappers/news.data-mapper'
import { NewsCategoryEntity } from './entities/newsCategory.entity'
import { CategoryNewsDataMapper } from './data-mappers/category.data-mapper'
import { CategoryNewsController } from './controllers/category.controller'
import { CategoryNewsService } from './services/category.service'
import { NewsContentEntity } from './entities/newsContent.entity'
import { NewsPostContentData } from './entities/newsPostContentData.entity'
import { NewsCatContentEntity } from './entities/newsCatContent.entity'

@Module({
  imports: [TypeOrmModule.forFeature([NewsEntity, NewsCategoryEntity, NewsContentEntity, NewsPostContentData, NewsCatContentEntity]), ScheduleModule.forRoot()],
  controllers: [NewsController, CategoryNewsController],
  providers: [NewsService, NewsDataMapper, NewsEntityDataFilter, CategoryNewsDataMapper, CategoryNewsService],
})
export class MainModule {}
