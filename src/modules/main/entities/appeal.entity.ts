import { Transform } from 'class-transformer'
import { IsDateString, IsEmail, IsEnum, Validate } from 'class-validator'
import { AppealType, IsValidIPN } from 'src/modules/main/constants/appeal.constant'
import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm'

@Entity('appeal')
@Unique(['email'])
export class AppealEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'email' })
  @IsEmail()
  email: string

  @Column({ type: 'date' })
  @IsDateString()
  finishedAt: string

  @Column()
  @Transform((item) => item && item.value && item.value.toLowerCase())
  @IsEnum(AppealType)
  type: string

  @Column({ type: 'bigint' })
  @Validate(IsValidIPN)
  ipn: number

  @Column()
  age: number

  constructor(newsData: Partial<AppealEntity>) {
    Object.assign(this, newsData)
  }
}
