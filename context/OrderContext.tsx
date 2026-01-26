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
	const [orders, setOrders] = useState<Order[]>([])
	const { user } = useAuth()

	useEffect(() => {
		if (user) {
			const savedOrders = localStorage.getItem(`orders_${user.id}`)
			if (savedOrders) {
				setOrders(JSON.parse(savedOrders))
			}
		}
	}, [user])

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
