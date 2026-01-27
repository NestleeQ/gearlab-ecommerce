'use client'
import { CartItem, CartState } from '@/types/cart'
import { createContext, useContext, useEffect, useState } from 'react'

interface CartContextType extends CartState {
	addToCart: (item: CartItem) => void
	removeFromCart: (id: number, size: string, color: string) => void
	updateQuantity: (
		id: number,
		size: string,
		color: string,
		quantity: number
	) => void
	clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
	// Ленивая инициализация - выполнится только один раз
	const [items, setItems] = useState<CartItem[]>(() => {
		if (typeof window !== 'undefined') {
			const savedCart = localStorage.getItem('cart')
			if (savedCart) {
				try {
					return JSON.parse(savedCart)
				} catch (error) {
					console.error('Error loading cart:', error)
					return []
				}
			}
		}
		return []
	})

	// Синхронизация с localStorage при изменении items
	useEffect(() => {
		if (typeof window !== 'undefined') {
			localStorage.setItem('cart', JSON.stringify(items))
		}
	}, [items])

	const total = items.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0
	)

	const itemCount = items.reduce((count, item) => count + item.quantity, 0)

	const addToCart = (newItem: CartItem) => {
		setItems(prevItems => {
			const existingItemIndex = prevItems.findIndex(
				item =>
					item.id === newItem.id &&
					item.size === newItem.size &&
					item.color === newItem.color
			)

			if (existingItemIndex > -1) {
				// Товар уже есть - увеличиваем количество
				const updatedItems = [...prevItems]
				updatedItems[existingItemIndex] = {
					...updatedItems[existingItemIndex],
					quantity:
						updatedItems[existingItemIndex].quantity +
						newItem.quantity
				}
				return updatedItems
			} else {
				// Новый товар - добавляем в корзину
				return [...prevItems, { ...newItem }]
			}
		})
	}

	const removeFromCart = (id: number, size: string, color: string) => {
		setItems(prevItems =>
			prevItems.filter(
				item =>
					!(
						item.id === id &&
						item.size === size &&
						item.color === color
					)
			)
		)
	}

	const updateQuantity = (
		id: number,
		size: string,
		color: string,
		quantity: number
	) => {
		if (quantity < 1) {
			removeFromCart(id, size, color)
			return
		}

		setItems(prevItems =>
			prevItems.map(item =>
				item.id === id && item.size === size && item.color === color
					? { ...item, quantity }
					: item
			)
		)
	}

	const clearCart = () => {
		setItems([])
	}

	return (
		<CartContext.Provider
			value={{
				items,
				total,
				itemCount,
				addToCart,
				removeFromCart,
				updateQuantity,
				clearCart
			}}
		>
			{children}
		</CartContext.Provider>
	)
}

export function useCart() {
	const context = useContext(CartContext)
	if (context === undefined) {
		throw new Error('useCart must be used within a CartProvider')
	}
	return context
}
