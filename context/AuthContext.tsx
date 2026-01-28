'use client'

import { iAuthState, iUser } from '@/types/auth'
import { createContext, useContext, useState } from 'react'

interface AuthContextType extends iAuthState {
	login: (email: string, password: string) => boolean
	signup: (name: string, email: string, password: string) => boolean
	logout: () => void
	resetPassword: (email: string, newPassword: string) => boolean
	updateAccount: (name: string, email: string) => boolean
	checkEmailExists: (email: string) => boolean
	isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<iUser | null>(() => {
		if (typeof window !== 'undefined') {
			const savedUser = localStorage.getItem('currentUser')
			if (savedUser) {
				try {
					return JSON.parse(savedUser)
				} catch {
					return null
				}
			}
		}
		return null
	})

	const [isAuthenticated, setIsAuthenticated] = useState(() => {
		if (typeof window !== 'undefined') {
			return !!localStorage.getItem('currentUser')
		}
		return false
	})

	// Загрузка завершена сразу (нет асинхронной загрузки из localStorage)
	const [isLoading] = useState(false)

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

	const updateAccount = (name: string, email: string): boolean => {
		if (!user) return false

		const users = getUsers()
		const userIndex = users.findIndex(u => u.id === user.id)

		if (userIndex !== -1) {
			const existingUserIndex = users.findIndex(
				u => u.email === email && u.id !== user.id
			)
			if (existingUserIndex !== -1) {
				return false
			}

			const updatedUser = { ...user, name, email }
			users[userIndex] = updatedUser
			saveUsers(users)

			setUser(updatedUser)
			localStorage.setItem('currentUser', JSON.stringify(updatedUser))

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
				updateAccount,
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
