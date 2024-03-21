import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import { NewsCategoryEntity } from './newsCategory.entity'
import { NewsContentEntity } from './newsContent.entity'

@Entity('news')
export class NewsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @OneToMany(() => NewsContentEntity, (info) => info.newsPost)
  newsContent: NewsContentEntity[]

  @ManyToOne(() => NewsCategoryEntity, (cat) => cat, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  newsCategory: NewsCategoryEntity

  @Column({
    nullable: true,
  })
  slug: string

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
