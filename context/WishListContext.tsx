'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './AuthContext'

interface WishlistItem {
	id: number
	slug: string
	title: string
	price: number
	image: string
	addedAt: string
}

interface WishlistContextType {
	items: WishlistItem[]
	addToWishlist: (item: Omit<WishlistItem, 'addedAt'>) => void
	removeFromWishlist: (id: number) => void
	isInWishlist: (id: number) => boolean
}

const WishlistContext = createContext<WishlistContextType | undefined>(
	undefined
)

export function WishlistProvider({ children }: { children: React.ReactNode }) {
	// Ленивая инициализация
	const [items, setItems] = useState<WishlistItem[]>(() => {
		if (typeof window !== 'undefined') {
			const currentUser = localStorage.getItem('currentUser')
			if (currentUser) {
				try {
					const user = JSON.parse(currentUser)
					const savedWishlist = localStorage.getItem(
						`wishlist_${user.id}`
					)
					if (savedWishlist) {
						return JSON.parse(savedWishlist)
					}
				} catch (error) {
					console.error('Error loading wishlist:', error)
				}
			}
		}
		return []
	})

	const { user } = useAuth()

	// Сохранение при изменении
	useEffect(() => {
		if (user && items.length > 0) {
			localStorage.setItem(`wishlist_${user.id}`, JSON.stringify(items))
		}
	}, [items, user])

	const addToWishlist = (item: Omit<WishlistItem, 'addedAt'>) => {
		if (!items.find(i => i.id === item.id)) {
			setItems(prev => [
				...prev,
				{ ...item, addedAt: new Date().toISOString() }
			])
		}
	}

	const removeFromWishlist = (id: number) => {
		setItems(prev => prev.filter(item => item.id !== id))
	}

	const isInWishlist = (id: number) => {
		return items.some(item => item.id === id)
	}

	return (
		<WishlistContext.Provider
			value={{ items, addToWishlist, removeFromWishlist, isInWishlist }}
		>
			{children}
		</WishlistContext.Provider>
	)
}

export function useWishlist() {
	const context = useContext(WishlistContext)
	if (!context) {
		throw new Error('useWishlist must be used within WishlistProvider')
	}
	return context
}
