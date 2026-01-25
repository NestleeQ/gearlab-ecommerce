'use client'

import { iAuthState, iUser } from '@/types/auth'
import { createContext, useContext, useEffect, useState } from 'react'

interface AuthContextType extends iAuthState {
	login: (email: string, password: string) => boolean
	signup: (name: string, email: string, password: string) => boolean
	logout: () => void
	resetPassword: (email: string, newPassword: string) => boolean
	checkEmailExists: (email: string) => boolean
	isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<iUser | null>(null)
	const [isAuthenticated, setIsAuthenticated] = useState(false)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const savedUser = localStorage.getItem('currentUser')
		if (savedUser) {
			setUser(JSON.parse(savedUser))
			setIsAuthenticated(true)
		}
		setIsLoading(false)
	}, [])

	const getUsers = (): iUser[] => {
		const users = localStorage.getItem('users')
		return users ? JSON.parse(users) : []
	}

	const saveUsers = (users: iUser[]) => {
		localStorage.setItem('users', JSON.stringify(users))
	}

	const signup = (name: string, email: string, password: string): boolean => {
		const users = getUsers()

		if (users.some(u => u.email === email)) {
			return false
		}

		const newUser: iUser = {
			id: Date.now().toString(),
			name,
			email,
			password
		}

		users.push(newUser)
		saveUsers(users)

		setUser(newUser)
		setIsAuthenticated(true)
		localStorage.setItem('currentUser', JSON.stringify(newUser))

		return true
	}

	const login = (email: string, password: string): boolean => {
		const users = getUsers()
		const user = users.find(
			u => u.email === email && u.password === password
		)

		if (user) {
			setUser(user)
			setIsAuthenticated(true)
			localStorage.setItem('currentUser', JSON.stringify(user))
			return true
		}

		return false
	}

	const logout = () => {
		setUser(null)
		setIsAuthenticated(false)
		localStorage.removeItem('currentUser')
	}

	const checkEmailExists = (email: string): boolean => {
		const users = getUsers()
		return users.some(u => u.email === email)
	}

	const resetPassword = (email: string, newPassword: string): boolean => {
		const users = getUsers()
		const userIndex = users.findIndex(u => u.email === email)

		if (userIndex !== -1) {
			users[userIndex].password = newPassword
			saveUsers(users)
			return true
		}

		return false
	}

	return (
		<AuthContext.Provider
			value={{
				user,
				isAuthenticated,
				isLoading,
				login,
				signup,
				logout,
				resetPassword,
				checkEmailExists
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

export function useAuth() {
	const context = useContext(AuthContext)
	if (context === undefined) {
		throw new Error('useAuth must be used within an AuthProvider')
	}
	return context
}
