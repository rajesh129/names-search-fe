// src/services/names.ts
import { api } from '../lib/axios'
import { NamesSearchRequest, NamesSearchResponse } from '../types/get-names'

export async function searchNames(payload: NamesSearchRequest) {
  const { data } = await api.post<NamesSearchResponse>('/names/search', payload, {
    headers: { 'Content-Type': 'application/json' },
  })
  return data
}
