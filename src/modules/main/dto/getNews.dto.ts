import { IsDateString, IsOptional, IsString } from "class-validator";

export class GetNewsDto {
    @IsOptional()
    @IsString()
    lang: string

    @IsOptional()
    @IsString()
    newsCategory: string

    @IsOptional()
    @IsDateString()
    publishedBefore: string

    @IsOptional()
    @IsDateString()
    publishedAfter: string

    @IsOptional()
    @IsString()
    searchTerm: string
}
