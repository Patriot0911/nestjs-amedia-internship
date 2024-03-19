import { Injectable } from '@nestjs/common'
import { NewsEntity } from '../entities/news.entity';

@Injectable()
export class NewsDataMapper {
    getNewsList(newsList: NewsEntity[]) {
        return [
            ...newsList
        ]
    }

    getNewsById(news: NewsEntity, isLocalized: boolean) {
        const {
            newsContent,
        } = news
        if(isLocalized) {
            return {
                ...news,
                newsContent: newsContent[0]
            }
        }
        return {
            ...news
        }
    }
}
