import { FindOperator } from 'typeorm'

import { NewsEntity } from 'src/modules/main/entities/news.entity'
import { NewsCategoryEntity } from 'src/modules/main/entities/newsCategory.entity'

export interface INewsInfo {
  id: string
  translationList: INewsTranslations[]
  slug?: string
  publishedAt: string
  newsCategory?: ICatToResList
  isPublished?: boolean
  createdAt: string
}

export interface INewsTranslations {
  id: string
  lang: string
  title: string
  description: string
  thumbnailUrl?: string
  newPost?: NewsEntity
  contentData?: IContentData[]
}

export interface IContentData {
  id: string
  type: string
  htmlText: string
  bgImgSrc: string
}

export interface INewsListResponse {
  data: INewsInfo[]
  meta: {
    total: number
  }
}

export interface INewsResponse {
  data: INewsInfo
}

export interface INewsPutResponse {
  data: NewsEntity
}

export interface INewsFilter {
  lang?: string
  newsCategory?: string
  publishedBefore?: string
  publishedAfter?: string
  searchTerm?: string
}

export type TCategoryFilter = {
  id: string
}

interface ILangFilter {
  lang?: string
}

interface ISearchByDescription extends ILangFilter {
  shortDescription: FindOperator<string>
}
interface ISearchByTitle extends ILangFilter {
  title: FindOperator<string>
}

export type TSearchAndLangFilter = ILangFilter | (ISearchByDescription | ISearchByTitle)[]

export type TTimeFilter = FindOperator<string>

export interface INewsListFilter {
  publishedAt: TTimeFilter
  newsContent: TSearchAndLangFilter
  newsCategory: TCategoryFilter
}

export interface ICategoryList {
  data: NewsCategoryEntity[]
}

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

export type TCategoryListResponse = {
  data: ICatToResList[]
}
