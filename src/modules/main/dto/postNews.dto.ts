import { IsBoolean, IsOptional, IsString, IsUUID, IsUrl } from 'class-validator'

class PostNewsTranslationsDto {
  @IsString()
  lang: string

  @IsOptional()
  @IsString()
  title: string

  @IsOptional()
  @IsString()
  description: string

  @IsOptional()
  @IsUrl()
  thumbnailUrl: string
}

export class PostNewsDto {
  @IsBoolean()
  @IsOptional()
  isPublished: boolean

  @IsString()
  slug: string

  translationList: PostNewsTranslationsDto[]
}