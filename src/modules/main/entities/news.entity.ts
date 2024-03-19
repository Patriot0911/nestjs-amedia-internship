import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import { NewsContentEntity } from './newsContent.entity'
import { NewsCategoryEntity } from './newsCategory.entity'

@Entity('news')
export class NewsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @OneToMany(() => NewsContentEntity, (info) => info.newsPost)
  newsContent: NewsContentEntity[]

  @ManyToOne(() => NewsCategoryEntity, (cat) => cat)
  newsCategory: NewsCategoryEntity

  @Column({
    nullable: true,
    type: 'date',
  })
  publishedAt: string

  @Column({ default: false })
  isPublished: boolean

  @CreateDateColumn()
  createdAt: string

  constructor(newsData: Partial<NewsEntity>) {
    Object.assign(this, newsData)
  }
}
