import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm/repository/Repository'

import { INewsListResponse, INewsResponse } from 'src/modules/main/interfaces/news'

import { NewsEntity } from 'src/modules/main/entities/news.entity'

import { NewsDataMapper } from 'src/modules/main/data-mappers/news.data-mapper'

@Injectable()
export class NewsService {
  constructor(
    private readonly newsDataMapper: NewsDataMapper,
    @InjectRepository(NewsEntity)
    private readonly newsRepository: Repository<NewsEntity>,
  ) {}

  async getNewsList(): Promise<INewsListResponse> {
    const newsList = await this.newsRepository.find({
      where: {
        isPublished: true,
      },
      relations: {
        newsContent: true,
      },
    })

    return {
      data: newsList,
    }
  }

  async getNewsById(id: string): Promise<INewsResponse> {
    const news = await this.newsRepository.findOne({
      where: {
        id,
        isPublished: true,
      },
      relations: ['newsContent'],
    })

    if (!news) {
      throw new NotFoundException()
    }

    return {
      data: news,
    }
  }

  async getNewsByIdWithLang(id: string, lang: string): Promise<INewsResponse> {
    const filter = {
      id,
      isPublished: true,
      newsContent: {
        lang,
      },
    }
    const news = await this.newsRepository.findOne({
      where: filter,
      relations: ['newsContent'],
    })

    if (!news) {
      throw new NotFoundException()
    }

    return {
      data: {
        ...news,
        newsContent: news.newsContent[0],
      },
    }
  }
}
