import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import { NewsEntity } from './news.entity'
import { NewsCatContentEntity } from './newsCatContent.entity'

@Entity('newsCategory')
export class NewsCategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  defaultName: string

  @CreateDateColumn()
  createdAt: string

  @OneToMany(() => NewsEntity, (post) => post.newsCategory)
  newsPosts: NewsEntity[]

  @OneToMany(() => NewsCatContentEntity, (info) => info.category)
  catContent: NewsCatContentEntity[]
}
