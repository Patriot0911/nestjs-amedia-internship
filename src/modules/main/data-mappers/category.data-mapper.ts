import { Injectable } from '@nestjs/common'

import { ICatToResList, ICatTranslationToResList, ICategoryMappedList } from 'src/modules/main/interfaces/news'

import { NewsCatContentEntity } from 'src/modules/main/entities/newsCatContent.entity'
import { NewsCategoryEntity } from 'src/modules/main/entities/newsCategory.entity'

@Injectable()
export class CategoryNewsDataMapper {
  getMappedTranslationCatList(catContent: NewsCatContentEntity[]): ICatTranslationToResList[] {
    const mappedCats: ICatTranslationToResList[] = catContent.map((cat) => {
      const { id, lang, name } = cat

      return {
        lang,
        title: name,
        translationId: id,
      }
    })

    return mappedCats
  }

  getCategoryRefItem(category: NewsCategoryEntity): ICatToResList {
    const { catContent, defaultName, ...rest } = category
    if (!catContent) {
      return {
        ...rest,
        translationList: [],
      }
    }

    const translationList = this.getMappedTranslationCatList(catContent)

    return {
      ...rest,
      translationList,
    }
  }

  getCategoryRefsList(categories: NewsCategoryEntity[]): ICatToResList[] {
    if (!categories) {
      return []
    }

    const mappedCategories: ICatToResList[] = categories.map((cat) => this.getCategoryRefItem(cat))

    return mappedCategories
  }

  getCategoryList(categories: NewsCategoryEntity[]): ICategoryMappedList[] {
    const mappedCallBack = (cat: NewsCategoryEntity): ICategoryMappedList => {
      const { catContent, defaultName, newsPosts, ...rest } = cat

      return {
        ...rest,
        title: defaultName,
      }
    }

    const mappedCategories = categories.map(mappedCallBack)

    return mappedCategories
  }
}
