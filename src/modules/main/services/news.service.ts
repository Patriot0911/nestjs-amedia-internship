import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { NewsEntityDataFilter } from 'src/modules/main/filters/news.entity.filters'
import { Repository } from 'typeorm/repository/Repository'

import { INewsFilter, INewsListResponse, INewsPutResponse, INewsResponse } from 'src/modules/main/interfaces/news'

import { PostNewsDto } from 'src/modules/main/dto/postNews.dto'
import { PutNewsDto } from 'src/modules/main/dto/putNews.dto'

import { NewsEntity } from 'src/modules/main/entities/news.entity'
import { NewsCategoryEntity } from 'src/modules/main/entities/newsCategory.entity'
import { NewsContentEntity } from 'src/modules/main/entities/newsContent.entity'

import { NewsDataMapper } from 'src/modules/main/data-mappers/news.data-mapper'

@Injectable()
export class NewsService {
  private readonly newsDataMapper: NewsDataMapper

  private readonly newsEntityDataFilter: NewsEntityDataFilter

  @InjectRepository(NewsEntity)
  private readonly newsRepository: Repository<NewsEntity>

  @InjectRepository(NewsContentEntity)
  private readonly newsContentRepository: Repository<NewsContentEntity>

  @InjectRepository(NewsCategoryEntity)
  private readonly newsCategoryRepository: Repository<NewsCategoryEntity>

  constructor() {
    this.newsDataMapper = new NewsDataMapper()
    this.newsEntityDataFilter = new NewsEntityDataFilter()
  }

  async postNewsById(body: PostNewsDto): Promise<any> {
    const newNews = new NewsEntity({
      isPublished: body.isPublished,
      slug: body.slug,
    })
    const dbNews = await this.newsRepository.save(newNews)
    for (const content of body.translationList) {
      const newsContent = new NewsContentEntity({
        lang: content.lang,
        shortDescription: content.description,
        title: content.title,
        thumbnailUrl: content.thumbnailUrl && content.thumbnailUrl.length > 0 ? content.thumbnailUrl : null,
        newsPost: dbNews,
      })

      await this.newsContentRepository.save(newsContent)
    }

    return {
      data: dbNews,
    }
  }

  async getSingleNewsByIdFromDb(id: string, lang?: string): Promise<NewsEntity> {
    const filter = {
      id,
      newsContent: {
        lang,
      },
    }
    const news = await this.newsRepository.findOne({
      where: filter,
      relations: {
        newsCategory: {
          catContent: true,
        },
        newsContent: true,
      },
    })

    if (!news) {
      throw new NotFoundException()
    }

    return news
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
      join: {
        alias: 'news',
        innerJoinAndSelect: {
          lang: 'news.newsContent',
        },
      },
    })

    const data = this.newsDataMapper.getNewsList(newsList)

    return {
      meta: {
        total: data.length,
      },
      data,
    }
  }

  async getNewsById(id: string, lang?: string): Promise<INewsResponse> {
    const news = await this.getSingleNewsByIdFromDb(id, lang)

    if (!news) {
      throw new NotFoundException()
    }

    const data = this.newsDataMapper.getNewsById(news)

    return {
      data,
    }
  }

  async putNewsById(id: string, body: PutNewsDto): Promise<INewsPutResponse> {
    const baseNews = await this.getSingleNewsByIdFromDb(id)
    if (!baseNews) {
      throw new NotFoundException()
    }

    if(body.newsCategory) {
      const cat = await this.newsCategoryRepository.findOne({
        where: {
          id: body.newsCategory.id,
        },
      })
      const modBaseNews: NewsEntity = {
        ...baseNews,
        isPublished: body.isPublished,
        publishedAt: body.publishedAt,
        slug: body.slug,
        newsCategory: cat,
      }
      await this.newsRepository.save(modBaseNews)
    }
    const curContentNews = baseNews.newsContent.find((item) => item.lang === body.lang)
    const bodyCurContent = body.translationList.find((item) => item.lang === body.lang)
    const modContentNews: NewsContentEntity = {
      ...curContentNews,
      shortDescription: bodyCurContent.description,
      title: bodyCurContent.title,
      thumbnailUrl: bodyCurContent.thumbnailUrl,
      contentData: bodyCurContent.contentData && JSON.stringify(bodyCurContent.contentData),
      metaData: bodyCurContent.metaData && JSON.stringify(bodyCurContent.metaData),
    }

    await this.newsContentRepository.save(modContentNews)
    const data = await this.getSingleNewsByIdFromDb(id)

    return {
      data,
    }
  }

  async deleteNewsById(id: string): Promise<any> {
    const baseNews = await this.getSingleNewsByIdFromDb(id)
    if (!baseNews) {
      throw new NotFoundException()
    }

    const deletedNews = await this.newsRepository.remove(baseNews)

    return {
      data: deletedNews,
    }
  }
}
