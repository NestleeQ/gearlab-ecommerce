'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './AuthContext'

interface iWishlistItem {
	id: number
	slug: string
	title: string
	price: number
	image: string
	addedAt: string
}

interface WishlistContextType {
	items: iWishlistItem[]
	addToWishlist: (item: Omit<iWishlistItem, 'addedAt'>) => void
	removeFromWishlist: (id: number) => void
	isInWishlist: (id: number) => boolean
}

const WishlistContext = createContext<WishlistContextType | undefined>(
	undefined
)

export function WishlistProvider({ children }: { children: React.ReactNode }) {
	const [items, setItems] = useState<iWishlistItem[]>([])
	const { user } = useAuth()

	useEffect(() => {
		if (user) {
			const saved = localStorage.getItem(`wishlist_${user.id}`)
			if (saved) {
				setItems(JSON.parse(saved))
			}
		}
	}, [user])

	useEffect(() => {
		if (user && items.length > 0) {
			localStorage.setItem(`wishlist_${user.id}`, JSON.stringify(items))
		}
	}, [items, user])

	const addToWishlist = (item: Omit<iWishlistItem, 'addedAt'>) => {
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
