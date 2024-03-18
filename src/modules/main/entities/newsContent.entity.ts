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

  @ManyToOne(() => NewsEntity, (post) => post.newsContent, { cascade: true })
  newsPost: NewsEntity
}
