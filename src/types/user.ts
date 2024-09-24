export interface Register {
  username: string
  password: string
  email: string
}

export interface User {
  id: number
  name: string
  password: string
  email: string
  phone: string
  role: string
  date: string
}

export interface basicUser {
  id: number
  userName: string
  accountBalance: number
  avatar?: string
  accountStatus: boolean
  address?: string
  date?: string
}
