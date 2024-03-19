import { Injectable } from '@nestjs/common'
import { INewsFilter } from '../interfaces/news';
import { Like, LessThan, MoreThan, And } from 'typeorm';

@Injectable()
export class NewsEntityDataFilter {
    getPrimeFilter(lang?: string) {
        const primeFilter = {
            isPublished: true,
        }
        return primeFilter
    }

    getCategoryFilter(category?: string) {
        const categoryFilter = [
            {
                defaultName: Like(`%${category}%`),
            },
            {
                catContent: {
                    name: Like(`%${category}%`),
                },
            },
        ]
        return category && categoryFilter
    }

    getSearchAndLangFilter(search?: string, lang?: string) {
        if(!search && lang)
            return {
                lang
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

    getTimeFilter(publishedAfter?: string, publishedBefore?: string) {
        if(!publishedAfter && !publishedBefore)
            return
        const beforeFilter = LessThan(publishedBefore)
        const afterFilter = MoreThan(publishedAfter)

        if(publishedAfter && publishedBefore)
            return And(afterFilter, beforeFilter)
        if(publishedAfter)
            return afterFilter
        return beforeFilter
    }

    getNewsListFilter(queryFilter: INewsFilter) {
        const {
            newsCategory,
            lang,
            publishedAfter,
            publishedBefore,
            searchTerm,
        } = queryFilter

        const primeFilter = this.getPrimeFilter(lang)
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
