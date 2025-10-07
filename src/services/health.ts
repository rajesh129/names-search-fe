// src/services/names.ts
import { api } from '../lib/axios'

export async function healthCheck() {
  await api.get('/health', {
    headers: { 'Content-Type': 'application/json' },
  })
}
