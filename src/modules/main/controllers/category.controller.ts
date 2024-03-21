import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { TCategoryListResponse } from 'src/modules/main/interfaces/news'

import { PostCategoryDto } from 'src/modules/main/dto/postCat.dto'
import { PutCategoryDto } from 'src/modules/main/dto/putCat.dto'

import { CategoryNewsService } from 'src/modules/main/services/category.service'

@ApiTags('Categories')
@Controller('news-category')
export class CategoryNewsController {
  constructor(private readonly categoryNewsService: CategoryNewsService) {}

  @Get('/list')
  async getCatList(): Promise<TCategoryListResponse> {
    return await this.categoryNewsService.getCategoryNewsList()
  }

  @Get('/item/:id')
  async getCatById(@Param('id', ParseUUIDPipe) id: string): Promise<TCategoryListResponse> {
    return await this.categoryNewsService.getCategoryInfo(id)
  }

  @Put('/item/:id')
  async putCatById(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: PutCategoryDto,
  ): Promise<TCategoryListResponse> {
    return await this.categoryNewsService.putCategoryInfo(id, body)
  }

  @Post('/item')
  async postCatById(@Body() body: PostCategoryDto): Promise<TCategoryListResponse> {
    return await this.categoryNewsService.postCategory(body)
  }

  @Delete('/item/:id')
  async deleteCatById(@Param('id', ParseUUIDPipe) id: string): Promise<TCategoryListResponse> {
    return await this.categoryNewsService.deleteCategory(id)
  }

  @Get('/reference')
  async getCatRefsList(): Promise<TCategoryListResponse> {
    return await this.categoryNewsService.getCategoryRefsNewsList()
  }
}
