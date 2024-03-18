export interface INewsInfo {
  id: string
  newsContent: INewsLangContent | INewsLangContent[]
  publishedAt: string
  isPublished?: boolean
  createdAt: string
}

export interface INewsLangContent {
  title: string
  shortDescription: string
}

export interface INewsListResponse {
  data: INewsInfo[]
}

export interface INewsResponse {
  data: INewsInfo
}
