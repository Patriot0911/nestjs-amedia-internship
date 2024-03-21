import { IsBoolean, IsDateString, IsOptional, IsString, IsUUID } from 'class-validator'

class PutCatTranslationDto {
    @IsOptional()
    @IsString()
    @IsUUID()
    translationId: string

    @IsOptional()
    @IsString()
    title: string

    @IsOptional()
    @IsString()
    lang: string
}

export class PutCategoryDto {
    @IsOptional()
    @IsString()
    @IsUUID()
    id: string

    @IsOptional()
    @IsDateString()
    createdAt: string

    @IsOptional()
    @IsBoolean()
    isPublished: boolean

    @IsOptional()
    translationList: PutCatTranslationDto[]

    @IsOptional()
    @IsString()
    lang: string

    @IsOptional()
    @IsString()
    translationId: string
}
