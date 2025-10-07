import { create } from 'zustand'
import type { AuthUserState } from '../types/auth'

type State = {
  authUser: AuthUserState
}

type Actions = {
  setAuthUser: (data: Partial<AuthUserState>) => void
  reset: () => void
}

const initial: AuthUserState = {
  challengeToken: '',
    user: {
        id: '',
        email: '',
        role: '',
        is_totp_enabled: false,
    },
    password: '',
}

export const useAuthUserStore = create<State & Actions>((set) => ({
  authUser: initial,
  setAuthUser: (data) => set((state) => ({ authUser: { ...state.authUser, ...data } })),
  reset: () => set({ authUser: initial }),
}))
