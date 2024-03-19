import { Injectable } from '@nestjs/common'

import { INewsById } from 'src/modules/main/interfaces/news'

import { NewsEntity } from 'src/modules/main/entities/news.entity'

@Injectable()
export class NewsDataMapper {
  getNewsList(newsList: NewsEntity[]): NewsEntity[] {
    return [...newsList]
  }

  getNewsById(news: NewsEntity, isLocalized: boolean): INewsById {
    const { newsContent } = news
    if (isLocalized) {
      return {
        ...news,
        newsContent: newsContent[0],
      }
    }

    return {
      ...news,
    }
  }
}
