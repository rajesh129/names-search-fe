import { api } from '../lib/axios'
import { getCookie } from '../lib/get-cookies'
import { BulkPayload } from '../types/bulk-upload'

export async function bulkUploadNames(payload: BulkPayload) {
  const { data } = await api.post<any>('/names/bulk', payload, {
    withCredentials: true,
    headers: { 
        'Content-Type': 'application/json',
        'x-csrf-token': getCookie('csrf_token')
    },
  })
  return data
}