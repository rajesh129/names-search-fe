import { create } from 'zustand'
import type { UserProfile } from '../types'

type State = {
  profile: UserProfile
}

type Actions = {
  setProfile: (data: Partial<UserProfile>) => void
  reset: () => void
}

const initial: UserProfile = {
  name: '',
  email: '',
  age: null,
}

export const useUserStore = create<State & Actions>((set) => ({
  profile: initial,
  setProfile: (data) =>
    set((state) => ({ profile: { ...state.profile, ...data } })),
  reset: () => set({ profile: initial }),
}))
