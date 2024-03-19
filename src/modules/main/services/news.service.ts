import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { NewsEntityDataFilter } from 'src/modules/main/filters/news.entity.filters'
import { Repository } from 'typeorm/repository/Repository'

import { INewsFilter, INewsListResponse, INewsResponse } from 'src/modules/main/interfaces/news'

import { NewsEntity } from 'src/modules/main/entities/news.entity'

import { NewsDataMapper } from 'src/modules/main/data-mappers/news.data-mapper'

@Injectable()
export class NewsService {
  private readonly newsDataMapper: NewsDataMapper

  private readonly newsEntityDataFilter: NewsEntityDataFilter

  @InjectRepository(NewsEntity)
  private readonly newsRepository: Repository<NewsEntity>

  constructor() {
    this.newsDataMapper = new NewsDataMapper()
    this.newsEntityDataFilter = new NewsEntityDataFilter()
  }

  async getNewsList(queryFilter: INewsFilter): Promise<INewsListResponse> {
    const filter = this.newsEntityDataFilter.getNewsListFilter(queryFilter)
    const relations = {
      newsContent: true,
      newsCategory: {
        catContent: true,
      },
    }

    const newsList = await this.newsRepository.find({
      where: filter,
      relations,
    })

    const data = this.newsDataMapper.getNewsList(newsList)

    return {
      data,
    }
  }

  async getNewsById(id: string, lang?: string): Promise<INewsResponse> {
    const filter = {
      id,
      isPublished: true,
      newsContent: {
        lang,
      },
    }
    const relations = {
      newsCategory: true,
      newsContent: true,
    }
    const news = await this.newsRepository.findOne({
      where: filter,
      relations,
    })

    if (!news) {
      throw new NotFoundException()
    }

    const data = this.newsDataMapper.getNewsById(news, !!lang)

    return {
      data,
    }
  }
}
