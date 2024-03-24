import { NewsCatContentEntity } from 'src/modules/main/entities/newsCatContent.entity'
import { NewsCategoryEntity } from 'src/modules/main/entities/newsCategory.entity'

export interface ICatTranslationToResList {
  translationId: string
  lang: string
  title: string
}

export interface ICatToResList {
  id: string
  translationList: ICatTranslationToResList[]
  publishedAt: string | null
  createdAt: string
  isPublished: boolean
}

export type ICategoryRefsListResponse = {
  data: ICatToResList[]
}

export interface IDeleteCategoryResponse {
  data: NewsCategoryEntity
}

export interface IPostCategoryResponse {
  data: NewsCategoryEntity
}

export interface IPutCategoryResponse {
  data: NewsCatContentEntity
}

export interface IGetCategoryResponse {
  data: ICatToResList
}

export interface ICategoryMappedList {
  id: string
  createdAt: Date | string
  isPublished?: boolean
  title: string
}

export interface ICategoryListResponse {
  meta: {
    total: number
  }
  data: ICategoryMappedList[]
}
