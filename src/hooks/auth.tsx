import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode
} from 'react'

import { api } from '../services/api'
import { database } from '../database'
import { User as UserModel } from '../database/models/User'

interface IUser {
  id: string
  user_id: string
  name: string
  email: string
  driver_license: string
  avatar: string
  token: string
}

interface  ISignInCredentials {
  email: string
  password: string
}

interface IAuthContextData {
  user: IUser
  signIn: (credentials: ISignInCredentials) => Promise<void>
  signOut: () => Promise<void>
  updateUser: (newUserData: IUser) => Promise<void>
}

interface IAuthProviderProps {
  children: ReactNode
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData)

export function AuthProvider({ children }: IAuthProviderProps) {
  const [user, setUser] = useState<IUser>({} as IUser)

  async function signIn({ email, password }: ISignInCredentials) {
    try {
      const response = await api.post('/sessions', {
        email,
        password
      })
  
      const { token, user } = response.data
      
      api.defaults.headers.authorization = `Bearer ${token}`

      const userCollection = database.get<UserModel>('users')

      await database.write(async () => {
        await userCollection.create(( newUser) => {
          newUser.user_id = user.id
          newUser.name = user.name
          newUser.email = user.email
          newUser.driver_license = user.driver_license
          newUser.avatar = user.avatar
          newUser.token = token
        })
      })
      
      setUser({ ...user, token })
    } catch(error) {
      throw new Error(error)
    }
  }

  async function signOut() {
    try {
      const userCollection = database.get<UserModel>('users')

      await database.write(async () => {
        const selectedUser = await userCollection.find(user.id)
        await selectedUser.destroyPermanently()

        setUser({} as IUser)
      })
    } catch (error) {
      throw new Error(error)
    }
  }

  async function updateUser(newUserData: IUser) {
    try {
      const userCollection = database.get<UserModel>('users')
      await database.write(async () => {
        const selectedUser = await userCollection.find(newUserData.id)
        await selectedUser.update((userData) => {
          userData.name = newUserData.name
          userData.driver_license = newUserData.driver_license
          userData.avatar = newUserData.avatar
        })
      })

      setUser(newUserData)
    } catch (error) {
      throw new Error(error)
    }
  }

  useEffect(() => {
    async function loadUserData() {
      const userCollection = database.get<UserModel>('users')
      const response = await userCollection.query().fetch()

      if (response.length > 0) {
        const userData = response[0]._raw as unknown as IUser
      
        api.defaults.headers.authorization = `Bearer ${user.token}`

        setUser(userData)
      }
    }

    loadUserData()
  }, [])

  return (
    <AuthContext.Provider value={{
      user,
      signIn,
      signOut,
      updateUser
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): IAuthContextData {
  const context = useContext(AuthContext)
  return context
}