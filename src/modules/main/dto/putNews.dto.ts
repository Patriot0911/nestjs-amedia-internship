import { IsBoolean, IsDateString, IsOptional, IsString, IsUUID, IsUrl } from 'class-validator'


class PutNewsTranslationDto {
    @IsOptional()
    @IsString()
    id: string // incorrect

    @IsOptional()
    @IsString()
    lang: string

    @IsOptional()
    @IsString()
    title: string

    @IsOptional()
    @IsString()
    thumbnailUrl?: string

    @IsOptional()
    @IsString()
    description: string

    @IsOptional()
    contentData: null
    metaData: null

    @IsOptional()
    @IsString()
    htmlText: string
}

export class PutNewsDto {
    @IsOptional()
    @IsString()
    id: string

    @IsOptional()
    @IsString()
    slug: string

    @IsOptional()
    @IsDateString()
    publishedAt: string

    @IsOptional()
    @IsBoolean()
    isPublished: boolean

    @IsOptional()
    @IsDateString()
    createdAt: string

    @IsOptional()
    newsCategory: {
      id: string
    }

    @IsOptional()
    translationList: PutNewsTranslationDto[]

    @IsOptional()
    @IsString()
    lang: string

    @IsOptional()
    @IsString()
    title: string

    @IsOptional()
    @IsUrl()
    thumbnailUrl: string

    @IsOptional()
    @IsString()
    description: string

    @IsOptional()
    @IsString()
    _lang: string

    @IsOptional()
    publishedAtTime: { hour: number, minute: number }
}
