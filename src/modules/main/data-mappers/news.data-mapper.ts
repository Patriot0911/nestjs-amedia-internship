import { Injectable } from '@nestjs/common'

import { INewsInfo, INewsTranslations } from 'src/modules/main/interfaces/news'

import { NewsEntity } from 'src/modules/main/entities/news.entity'
import { NewsContentEntity } from '../entities/newsContent.entity';
import { NewsCategoryEntity } from '../entities/newsCategory.entity';
import { CategoryNewsDataMapper } from './category.data-mapper';

@Injectable()
export class NewsDataMapper {
  private readonly categoryDataMapper: CategoryNewsDataMapper

  constructor() {
    this.categoryDataMapper = new CategoryNewsDataMapper()
  }

  getSingleTranslation(newsContent: NewsContentEntity, newsId?: string): INewsTranslations {
    const {
      id,
      shortDescription,
      ...rest
    } = newsContent;
    const translationContent = {
      ...rest,
      id: newsId ?? id,
      description: shortDescription,
    };
    return translationContent
  }

  getTranslationList(newsContent: NewsContentEntity[], newsId?: string): INewsTranslations[]{
    const translationList = newsContent.map(
      (contet) => this.getSingleTranslation(contet, newsId)
    )
    return translationList
  }

  getNewsList(newsList: NewsEntity[]): INewsInfo[] {
    const mappedNewsList = newsList.map(
      (news) => this.getNewsById(news)
    )
    return mappedNewsList
  }

  getNewsById(news: NewsEntity): INewsInfo {
    const {
      newsContent,
      id,
      ...rest
    } = news
    const translationList = this.getTranslationList(newsContent, id)
    const newsCategory = rest.newsCategory && this.categoryDataMapper.getCategoryRefItem(rest.newsCategory);
    const mappedNews: INewsInfo = {
      ...rest,
      id,
      translationList,
      newsCategory
    };
    return mappedNews
  }
}
