import { Injectable } from '@nestjs/common'
import { And, LessThanOrEqual, Like, MoreThanOrEqual } from 'typeorm'

import {
  INewsFilter,
  INewsListFilter,
  TCategoryFilter,
  TSearchAndLangFilter,
  TTimeFilter,
} from 'src/modules/main/interfaces/news'

@Injectable()
export class NewsEntityDataFilter {
  getPrimeFilter(): any {
    const primeFilter = {}

    return primeFilter
  }

  getCategoryFilter(categoryId?: string): TCategoryFilter {
    const categoryFilter = {
      id: categoryId,
    }

    return categoryId && categoryFilter
  }

  getSearchAndLangFilter(search?: string, lang?: string): TSearchAndLangFilter {
    if (!search && lang) {
      return {
        lang,
      }
    }

    const searchFilter = [
      {
        shortDescription: Like(`%${search}%`),
        lang,
      },
      {
        title: Like(`%${search}%`),
        lang,
      },
    ]

    return search && searchFilter
  }

  getTimeFilter(publishedAfter?: string, publishedBefore?: string): TTimeFilter {
    if (!publishedAfter && !publishedBefore) {
      return
    }

    const beforeFilter = LessThanOrEqual(publishedBefore)
    const afterFilter = MoreThanOrEqual(publishedAfter)

    if (publishedAfter && publishedBefore) {
      return And(afterFilter, beforeFilter)
    }

    if (publishedAfter) {
      return afterFilter
    }

    return beforeFilter
  }

  getNewsListFilter(queryFilter: INewsFilter): INewsListFilter {
    const { newsCategory, lang, publishedAfter, publishedBefore, searchTerm } = queryFilter

    const primeFilter = this.getPrimeFilter()
    const searchFilter = this.getSearchAndLangFilter(searchTerm, lang)
    const categoryFilter = this.getCategoryFilter(newsCategory)
    const dateFilter = this.getTimeFilter(publishedAfter, publishedBefore)

    const filter = {
      ...primeFilter,
      newsContent: searchFilter,
      newsCategory: categoryFilter,
      publishedAt: dateFilter,
    }

    return filter
  }
}
