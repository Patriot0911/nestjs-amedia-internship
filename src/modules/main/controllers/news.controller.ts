import { Controller, Get, Param, ParseUUIDPipe, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { INewsListResponse, INewsResponse } from 'src/modules/main/interfaces/news'

import { NewsService } from 'src/modules/main/services/news.service'
import { GetNewsDto } from '../dto/getNews.dto';

@ApiTags('News')
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get('')
  async getNewsList(
    @Query() filterQuery: GetNewsDto,
  ): Promise<INewsListResponse> {
    return await this.newsService.getNewsList(filterQuery)
  }

  @Get('/:id')
  async getNewsById(
    @Param('id', ParseUUIDPipe) id: string,
    @Query('lang') lang: string,
  ): Promise<INewsResponse> {
    return await this.newsService.getNewsById(id, lang)
  }
}
