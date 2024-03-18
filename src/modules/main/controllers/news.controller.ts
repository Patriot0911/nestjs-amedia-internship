import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { INewsListResponse, INewsResponse } from 'src/modules/main/interfaces/news'

import { NewsService } from 'src/modules/main/services/news.service'

@ApiTags('News')
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get('')
  async getNewsList(): Promise<INewsListResponse> {
    return await this.newsService.getNewsList()
  }

  @Get('/:id')
  async getNewsById(@Param('id', ParseUUIDPipe) id: string): Promise<INewsResponse> {
    return await this.newsService.getNewsById(id)
  }

  @Get('/:id/:lang')
  async getLocalizedNewsById(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('lang') lang: string,
  ): Promise<INewsResponse> {
    return await this.newsService.getNewsByIdWithLang(id, lang)
  }
}
