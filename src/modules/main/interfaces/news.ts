import { FindOperator } from 'typeorm'

import { NewsCategoryEntity } from 'src/modules/main/entities/newsCategory.entity'
import { NewsContentEntity } from 'src/modules/main/entities/newsContent.entity'

export interface INewsInfo {
  id: string
  newsContent: INewsLangContent | INewsLangContent[]
  publishedAt: string
  isPublished?: boolean
  createdAt: string
}

export interface INewsLangContent {
  title: string
  shortDescription: string
}

export interface INewsListResponse {
  data: INewsInfo[]
}

export interface INewsResponse {
  data: INewsInfo
}

export interface INewsFilter {
  lang?: string
  newsCategory?: string
  publishedBefore?: string
  publishedAfter?: string
  searchTerm?: string
}

export interface IPrimeFilter {
  isPublished: boolean
}

interface ICatContentFilter {
  name: FindOperator<string>
}

type TCatDefaultName = FindOperator<string>

interface ICategoryFiltered {
  defaultName?: TCatDefaultName
  catContent?: ICatContentFilter
}

export type TCategoryFilter = ICategoryFiltered[]

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
  isPublished: boolean
  publishedAt: TTimeFilter
  newsContent: TSearchAndLangFilter
  newsCategory: TCategoryFilter
}

export interface INewsById {
  id: string
  newsContent: NewsContentEntity | NewsContentEntity[]
  newsCategory: NewsCategoryEntity
  publishedAt: string
  isPublished: boolean
  createdAt: string
}
