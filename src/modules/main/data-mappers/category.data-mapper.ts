import { Injectable } from '@nestjs/common'
import { NewsCategoryEntity } from '../entities/newsCategory.entity'
import { ICatToResList, ICatTranslationToResList } from '../interfaces/news'
import { NewsCatContentEntity } from '../entities/newsCatContent.entity'


@Injectable()
export class CategoryNewsDataMapper {
    getMappedTranslationCatList(catContent: NewsCatContentEntity[]): ICatTranslationToResList[] {
        const mappedCats: ICatTranslationToResList[] = catContent.map(
            (cat) => {
                const {
                    createdAt,
                    id,
                    lang,
                    name,
                } = cat;
                return {
                    lang,
                    title: name,
                    translationId: id
                }
            }
        )
        return mappedCats
    };

    getCategoryRefItem(category: NewsCategoryEntity): ICatToResList {
        const {
            catContent,
            defaultName,
            ...rest
        } = category
        if(!catContent) {
            return {
                ...rest,
                translationList: []
            }
        }
        const translationList = this.getMappedTranslationCatList(catContent)
        return {
            ...rest,
            translationList
        }
    }

    getCategoryRefsList(categories: NewsCategoryEntity[]): ICatToResList[] {
        if(!categories)
            return []
        const mappedCategories: ICatToResList[] = categories.map(
            (cat) => this.getCategoryRefItem(cat)
        )
        return mappedCategories
    }

    getCategoryList(categories: NewsCategoryEntity[]) {
        const mappedCategories = categories.map(
            (cat) => {
                const {
                    catContent,
                    defaultName,
                    newsPosts,
                    ...rest
                } = cat;
                return {
                    ...rest,
                    title: defaultName
                }
            }
        )
        return mappedCategories
    }
}
