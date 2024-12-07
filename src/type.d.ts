export interface ArticlesData {
  status: string
  totalResults: number
  articles?: ArticleType[] | null
}
export interface ArticleType {
  source: Source
  author?: string | null
  title: string
  description?: string | null
  url: string
  urlToImage?: string | null
  publishedAt: string
  content: string
}

export interface ArticleMappedType {
  source: Source
  author: string
  title: string
  description: string
  url: string
  urlToImage: string
  publishedAt: string
  content: string
  saved?: boolean
}

export interface Source {
  id?: string | null
  name: string
}
