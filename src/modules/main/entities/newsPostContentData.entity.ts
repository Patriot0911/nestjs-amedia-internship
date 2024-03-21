import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { NewsContentEntity } from './newsContent.entity'

@Entity('newsPostContentData')
export class NewsPostContentData {
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  type: string

  @Column()
  htmlText: string

  @Column()
  bgImgSrc: string

  @ManyToOne(() => NewsContentEntity, (post) => post.postDataContent, {
    cascade: true,
    onDelete: "CASCADE",
  })
  translationContent: NewsContentEntity
}
