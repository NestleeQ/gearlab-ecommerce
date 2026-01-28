'use client'
import { Order } from '@/types/order'
import { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './AuthContext'

interface OrderContextType {
	orders: Order[]
	addOrder: (order: Omit<Order, 'id' | 'orderedAt' | 'status'>) => void
}

const OrderContext = createContext<OrderContextType | undefined>(undefined)

export function OrderProvider({ children }: { children: React.ReactNode }) {
	// Ленивая инициализация
	const [orders, setOrders] = useState<Order[]>(() => {
		if (typeof window !== 'undefined') {
			const currentUser = localStorage.getItem('currentUser')
			if (currentUser) {
				try {
					const user = JSON.parse(currentUser)
					const savedOrders = localStorage.getItem(
						`orders_${user.id}`
					)
					if (savedOrders) {
						return JSON.parse(savedOrders)
					}
				} catch (error) {
					console.error('Error loading orders:', error)
				}
			}
		}
		return []
	})

	const { user } = useAuth()

	// Сохранение при изменении
	useEffect(() => {
		if (user && orders.length > 0) {
			localStorage.setItem(`orders_${user.id}`, JSON.stringify(orders))
		}
	}, [orders, user])

	const addOrder = (
		orderData: Omit<Order, 'id' | 'orderedAt' | 'status'>
	) => {
		const newOrder: Order = {
			...orderData,
			id: crypto.randomUUID(),
			orderedAt: new Date().toISOString(),
			status: 'processing'
		}
		setOrders(prev => [newOrder, ...prev])
	}

	return (
		<OrderContext.Provider value={{ orders, addOrder }}>
			{children}
		</OrderContext.Provider>
	)
}

export function useOrders() {
	const context = useContext(OrderContext)
	if (!context) {
		throw new Error('useOrders must be used within OrderProvider')
	}
	return context
}
