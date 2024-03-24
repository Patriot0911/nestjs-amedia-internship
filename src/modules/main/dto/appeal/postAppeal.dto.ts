import { Transform } from 'class-transformer'
import { IsDateString, IsEmail, IsEnum, IsNumber, IsString, Validate } from 'class-validator'
import { AppealType, IsValidIPN } from 'src/modules/main/constants/appeal.constant'

export class PostAppealDto {
  @IsString()
  @IsEmail()
  email: string

  @IsDateString()
  finishedAt: string

  @IsString()
  @Transform((item) => item && item.value && item.value.toLowerCase())
  @IsEnum(AppealType)
  type: AppealType

  @IsNumber()
  @Validate(IsValidIPN)
  ipn: number

  @IsNumber()
  age: number
}
