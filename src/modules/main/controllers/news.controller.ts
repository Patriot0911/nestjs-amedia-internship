import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { INewsListResponse, INewsResponse } from 'src/modules/main/interfaces/news'

import { GetNewsDto } from 'src/modules/main/dto/getNews.dto'

import { NewsService } from 'src/modules/main/services/news.service'
import { PutNewsDto } from '../dto/putNews.dto'
import { PostNewsDto } from '../dto/postNews.dto'

@ApiTags('News')
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get('/list')
  async getNewsList(@Query() filterQuery: GetNewsDto): Promise<INewsListResponse> {
    return await this.newsService.getNewsList(filterQuery)
  }

  @Get('/item/:id')
  async getNewsById(@Param('id', ParseUUIDPipe) id: string, @Query('lang') lang: string): Promise<INewsResponse> {
    return await this.newsService.getNewsById(id, lang)
  }

  @Post('/item')
  async postNewsById(@Body() body: PostNewsDto): Promise<any> {
    return await this.newsService.postNewsById(body)
  }

  @Put('/item/:id')
  async putNewsById(@Param('id', ParseUUIDPipe) id: string, @Body() body: PutNewsDto): Promise<any> {
    return await this.newsService.putNewsById(id, body)
  }

  @Delete('/item/:id')
  async deleteNewsById(@Param('id', ParseUUIDPipe) id: string): Promise<any> {
    return await this.newsService.deleteNewsById(id)
  }
}
