import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { NewsEntity } from './news.entity'

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
    nullable: true,
  })
  thumbnailUrl: string

  @Column({
    nullable: true,
  })
  contentData: string

  @Column({
    nullable: true,
  })
  metaData: string

  @ManyToOne(() => NewsEntity, (post) => post.newsContent, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  newsPost: NewsEntity

  constructor(newsData: Partial<NewsContentEntity>) {
    Object.assign(this, newsData)
  }
}
