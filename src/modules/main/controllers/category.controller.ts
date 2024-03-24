import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import {
  ICategoryListResponse,
  ICategoryRefsListResponse,
  IDeleteCategoryResponse,
  IGetCategoryResponse,
  IPostCategoryResponse,
  IPutCategoryResponse,
} from 'src/modules/main/interfaces/news'

import { PostCategoryDto } from 'src/modules/main/dto/categories/postCat.dto'
import { PutCategoryDto } from 'src/modules/main/dto/categories/putCat.dto'

import { CategoryNewsService } from 'src/modules/main/services/category.service'

@ApiTags('Categories')
@Controller('news-category')
export class CategoryNewsController {
  constructor(private readonly categoryNewsService: CategoryNewsService) {}

  @Get('/list')
  async getCatList(): Promise<ICategoryListResponse> {
    return await this.categoryNewsService.getCategoryNewsList()
  }

  @Get('/item/:id')
  async getCatById(@Param('id', ParseUUIDPipe) id: string): Promise<IGetCategoryResponse> {
    return await this.categoryNewsService.getCategoryInfo(id)
  }

  @Put('/item/:id')
  async putCatById(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: PutCategoryDto,
  ): Promise<IPutCategoryResponse> {
    return await this.categoryNewsService.putCategoryInfo(id, body)
  }

  @Post('/item')
  async postCatById(@Body() body: PostCategoryDto): Promise<IPostCategoryResponse> {
    return await this.categoryNewsService.postCategory(body)
  }

  @Delete('/item/:id')
  async deleteCatById(@Param('id', ParseUUIDPipe) id: string): Promise<IDeleteCategoryResponse> {
    return await this.categoryNewsService.deleteCategory(id)
  }

  @Get('/reference')
  async getCatRefsList(): Promise<ICategoryRefsListResponse> {
    return await this.categoryNewsService.getCategoryRefsNewsList()
  }
}
