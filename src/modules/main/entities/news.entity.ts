import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { NewsContentEntity } from './newsContent.entity'

@Entity('news')
export class NewsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @OneToMany(
    () => NewsContentEntity,
    (info) => info.newsPost
  )
  newsContent: NewsContentEntity[]

  @Column({ nullable: true, type: 'date' })
  publishedAt: string

  @Column({ default: false })
  isPublished: boolean

  @CreateDateColumn()
  createdAt: string

  constructor(newsData: Partial<NewsEntity>) {
    Object.assign(this, newsData)
  }
}
