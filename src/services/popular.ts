// src/services/names.ts
import { api } from '../lib/axios'

export async function getPopularNames() {
  const response = await api.get('/popular', {
    headers: { 'Content-Type': 'application/json' },
  })
  return response.data
}
