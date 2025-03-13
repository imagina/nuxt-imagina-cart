import type { UserData } from './user'

export interface LoginResponse {
  userToken: string
  expiresIn: string
  userData: UserData
}
