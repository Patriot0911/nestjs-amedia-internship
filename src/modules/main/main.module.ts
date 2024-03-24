import { Module } from '@nestjs/common'
import { ScheduleModule } from '@nestjs/schedule'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AppealControlller } from './controllers/apeal.controller'
import { CategoryNewsController } from './controllers/category.controller'
import { AppealDataMapper } from './data-mappers/appeal.data-mapper'
import { CategoryNewsDataMapper } from './data-mappers/category.data-mapper'
import { AppealEntity } from './entities/appeal.entity'
import { NewsCatContentEntity } from './entities/newsCatContent.entity'
import { NewsCategoryEntity } from './entities/newsCategory.entity'
import { NewsContentEntity } from './entities/newsContent.entity'
import { NewsEntityDataFilter } from './filters/news.entity.filters'
import { AppealsService } from './services/appeal.service'
import { CategoryNewsService } from './services/category.service'

import { NewsEntity } from 'src/modules/main/entities/news.entity'

import { NewsController } from 'src/modules/main/controllers/news.controller'

import { NewsService } from 'src/modules/main/services/news.service'

import { NewsDataMapper } from 'src/modules/main/data-mappers/news.data-mapper'

@Module({
  imports: [
    TypeOrmModule.forFeature([NewsEntity, NewsCategoryEntity, NewsContentEntity, NewsCatContentEntity, AppealEntity]),
    ScheduleModule.forRoot(),
  ],
  controllers: [NewsController, CategoryNewsController, AppealControlller],
  providers: [
    NewsService,
    NewsDataMapper,
    NewsEntityDataFilter,
    CategoryNewsDataMapper,
    CategoryNewsService,
    AppealsService,
    AppealDataMapper,
  ],
})
export class MainModule {}
