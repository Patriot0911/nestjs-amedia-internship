import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { NewsCategoryEntity } from './newsCategory.entity'

@Entity('newsCatContent')
export class NewsCatContentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  lang: string

  @Column()
  name: string

  @CreateDateColumn()
  createdAt: string

  @ManyToOne(() => NewsCategoryEntity, (post) => post.catContent, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  category: NewsCategoryEntity

  constructor(newsData: Partial<NewsCatContentEntity>) {
    Object.assign(this, newsData)
  }
}
