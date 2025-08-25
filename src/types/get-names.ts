// src/types/names.ts
export type LangCode = 'en' | 'fr' | 'ta'

export type NamesSearchRequest = {
  searchText: string
  lang: LangCode
  pagePerRecord: number
  page: number
}

export type NameItem = {
  tamil: string
  english: string[]
  french: string[]
  description: string
}

export type NamesSearchResponse = {
  getNames: NameItem[]
  totalCount: number
  nextCursor?: number | null
}
