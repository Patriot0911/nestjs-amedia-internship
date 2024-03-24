import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm/repository/Repository'

import {
  ICategoryListResponse,
  ICategoryRefsListResponse,
  IDeleteCategoryResponse,
  IGetCategoryResponse,
  IPostCategoryResponse,
  IPutCategoryResponse,
} from 'src/modules/main/interfaces/category'

import { PostCategoryDto } from 'src/modules/main/dto/categories/postCat.dto'
import { PutCategoryDto } from 'src/modules/main/dto/categories/putCat.dto'

import { NewsCatContentEntity } from 'src/modules/main/entities/newsCatContent.entity'
import { NewsCategoryEntity } from 'src/modules/main/entities/newsCategory.entity'

import { CategoryNewsDataMapper } from 'src/modules/main/data-mappers/category.data-mapper'

@Injectable()
export class CategoryNewsService {
  private readonly categoryDataMapper: CategoryNewsDataMapper

  @InjectRepository(NewsCategoryEntity)
  private readonly categoryRepository: Repository<NewsCategoryEntity>

  @InjectRepository(NewsCatContentEntity)
  private readonly categoryContentRepository: Repository<NewsCatContentEntity>

  constructor() {
    this.categoryDataMapper = new CategoryNewsDataMapper()
  }

  async postCategory(body: PostCategoryDto): Promise<IPostCategoryResponse> {
    const category = new NewsCategoryEntity({
      isPublished: body.isPublished,
      defaultName: body.translationList[0].title,
    })
    const dbCat = await this.categoryRepository.save(category)
    for (const content of body.translationList) {
      const createContent = new NewsCatContentEntity({
        category: dbCat,
        lang: content.lang,
        name: content.title,
      })

      await this.categoryContentRepository.save(createContent)
    }

    return {
      data: dbCat,
    }
  }

  async deleteCategory(id: string): Promise<IDeleteCategoryResponse> {
    const category = await this.categoryRepository.findOne({
      where: {
        id,
      },
    })
    if (!category) {
      throw new NotFoundException()
    }

    const deletedCat = await this.categoryRepository.remove(category)

    return {
      data: deletedCat,
    }
  }

  async putCategoryInfo(id: string, body: PutCategoryDto): Promise<IPutCategoryResponse> {
    const category = await this.categoryRepository.findOne({
      where: {
        id,
      },
    })
    if (!category) {
      throw new NotFoundException()
    }

    const modCat: NewsCategoryEntity = {
      ...category,
      isPublished: body.isPublished,
      publishedAt: body.isPublished ? new Date().toLocaleDateString() : null,
    }

    await this.categoryRepository.save(modCat)
    const selectedContent = await this.categoryContentRepository.findOne({
      where: {
        id: body.translationId,
      },
    })
    if (!selectedContent) {
      throw new NotFoundException()
    }

    const curContentForMod = body.translationList.find((item) => item.translationId === body.translationId)
    const newSelectedContent: NewsCatContentEntity = {
      ...selectedContent,
      name: curContentForMod.title,
    }
    const data = await this.categoryContentRepository.save(newSelectedContent)

    return {
      data,
    }
  }

  async getCategoryInfo(id: string): Promise<IGetCategoryResponse> {
    const category = await this.categoryRepository.findOne({
      where: {
        id,
      },
      relations: {
        catContent: true,
      },
    })
    if (!category) {
      throw new NotFoundException()
    }

    const data = this.categoryDataMapper.getCategoryRefItem(category)

    return {
      data,
    }
  }

  async getCategoryNewsList(): Promise<ICategoryListResponse> {
    const categoryList = await this.categoryRepository.find()
    const data = this.categoryDataMapper.getCategoryList(categoryList)
    const meta = {
      total: data.length,
    }

    return {
      meta,
      data,
    }
  }

  async getCategoryRefsNewsList(): Promise<ICategoryRefsListResponse> {
    const categoryList = await this.categoryRepository.find({
      relations: {
        catContent: true,
      },
    })
    if (!categoryList) {
      throw new NotFoundException()
    }

    const data = this.categoryDataMapper.getCategoryRefsList(categoryList)

    return {
      data,
    }
  }
}
