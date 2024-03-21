import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import { NewsEntity } from './news.entity'
import { NewsPostContentData } from './newsPostContentData.entity'

@Entity('newsContent')
export class NewsContentEntity {
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  lang: string

  @Column()
  title: string

  @Column()
  shortDescription: string

  @Column({
    nullable: true
  })
  thumbnailUrl: string

  @OneToMany(() => NewsPostContentData, (info) => info.translationContent)
  postDataContent: NewsPostContentData[]

  @ManyToOne(() => NewsEntity, (post) => post.newsContent, {
    cascade: true,
    onDelete: "CASCADE",
  })
  newsPost: NewsEntity

  constructor(newsData: Partial<NewsContentEntity>) {
    Object.assign(this, newsData)
  }
}
