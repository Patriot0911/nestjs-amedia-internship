import { IsBoolean, IsOptional, IsString } from 'class-validator'

class PostCategoryContentDto {
    @IsOptional()
    @IsString()
    description: string

    @IsOptional()
    @IsString()
    lang: string

    @IsOptional()
    @IsString()
    title: string
}

export class PostCategoryDto {
    @IsOptional()
    @IsBoolean()
    isPublished: boolean

    @IsOptional()
    translationList: PostCategoryContentDto[]
}
