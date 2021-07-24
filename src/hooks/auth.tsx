import React, {
  createContext,
  useState,
  useContext,
  ReactNode
} from 'react'

import { api } from '../services/api'

interface IUser {
  id: string
  name: string
  email: string
  driver_license: string
  avatar: string
}

interface IAuthState {
  token: string
  user: IUser
}

interface  ISignInCredentials {
  email: string
  password: string
}

interface IAuthContextData {
  user: IUser
  signIn: (credentials: ISignInCredentials) => Promise<void>
}

interface IAuthProviderProps {
  children: ReactNode
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData)

export function AuthProvider({ children }: IAuthProviderProps) {
  const [data, setData] = useState<IAuthState>({} as IAuthState)

  async function signIn({ email, password }: ISignInCredentials) {
    const response = await api.post('/sessions', {
      email,
      password
    })

    const { token, user } = response.data
    
    api.defaults.headers.authorization = `Bearer ${token}`
    
    setData({ token, user })
  }

  return (
    <AuthContext.Provider value={{
      user: data.user,
      signIn
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): IAuthContextData {
  const context = useContext(AuthContext)
  return context
}