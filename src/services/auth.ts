// src/services/names.ts
import { api } from '../lib/axios'
import { AuthRequest, AuthResponse, CodeAuthRequest } from '../types/auth'

export async function authLogin(payload: AuthRequest) {
  const { data } = await api.post<AuthResponse>('/auth/login', payload, {
    headers: { 'Content-Type': 'application/json' },
  })
  return data
}

export async function authCodeLogin(payload: CodeAuthRequest) {
  const { data } = await api.post<AuthResponse>('/auth/verify-totp', payload, {
    headers: { 'Content-Type': 'application/json' },
  })
  return data
}
