import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm/repository/Repository'

import { TCategoryListResponse } from 'src/modules/main/interfaces/news'

import { CategoryNewsDataMapper } from 'src/modules/main/data-mappers/category.data-mapper'
import { NewsCategoryEntity } from '../entities/newsCategory.entity'
import { PutCategoryDto } from '../dto/putCat.dto'
import { NewsCatContentEntity } from '../entities/newsCatContent.entity'
import { PostCategoryDto } from '../dto/postCat.dto'


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

  async postCategory(body: PostCategoryDto): Promise<any> {
    const category = new NewsCategoryEntity({
      isPublished: body.isPublished,
      defaultName: body.translationList[0].title
    })
    const dbCat = await this.categoryRepository.save(category)
    for(const content of body.translationList) {
      const createContent = new NewsCatContentEntity({
        category: dbCat,
        lang: content.lang,
        name: content.title,
      })
      await this.categoryContentRepository.save(createContent)
    }

    return {
      data: dbCat
    }
  }
  async deleteCategory(id: string): Promise<any> {
    const category = await this.categoryRepository.findOne({
      where: {
        id
      }
    })
    if (!category) {
      throw new NotFoundException()
    }
    const deletedCat = await this.categoryRepository.remove(category)

    return {
      data: deletedCat
    }
  }
  async putCategoryInfo(id: string, body: PutCategoryDto): Promise<any> {
    const category = await this.categoryRepository.findOne({
      where: {
        id
      }
    })
    if (!category) {
      throw new NotFoundException()
    }
    const modCat: NewsCategoryEntity = {
      ...category,
      isPublished: body.isPublished,
      publishedAt: body.isPublished ? new Date().toLocaleDateString() : null
    }
    await this.categoryRepository.save(modCat)
    const selectedContent = await this.categoryContentRepository.findOne({
      where: {
        id: body.translationId
      }
    })
    if (!selectedContent) {
      throw new NotFoundException()
    }
    const curContentForMod = body.translationList.find(item => item.translationId === body.translationId)
    const newSelectedContent: NewsCatContentEntity = {
      ...selectedContent,
      name: curContentForMod.title
    }
    const data = await this.categoryContentRepository.save(newSelectedContent)
    return {
      data
    }
  }

  async getCategoryInfo(id: string): Promise<any> {
    const category = await this.categoryRepository.findOne({
      where: {
        id
      },
      relations: {
        catContent: true
      }
    })
    if (!category) {
      throw new NotFoundException()
    }
    const data = this.categoryDataMapper.getCategoryRefItem(category)
    return {
      data
    }
  }

  async getCategoryNewsList(): Promise<any> {
    const categoryList = await this.categoryRepository.find()
    const data = this.categoryDataMapper.getCategoryList(categoryList)

    return {
      meta: {
        total: data.length,
      },
      data,
    }
  }

  async getCategoryRefsNewsList(): Promise<TCategoryListResponse> {
    const categoryList = await this.categoryRepository.find({
      relations: {
        catContent: true
      }
    })
    if(!categoryList) {
      throw new NotFoundException()
    }
    const data = this.categoryDataMapper.getCategoryRefsList(categoryList);
    return {
      data,
    }
  }
}
