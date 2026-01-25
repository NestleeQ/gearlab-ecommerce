'use client'

import { iOrder } from '@/types/order'
import { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './AuthContext'

interface OrderContextType {
	orders: iOrder[]
	addOrder: (order: Omit<iOrder, 'id' | 'orderedAt' | 'status'>) => void
}

const OrderContext = createContext<OrderContextType | undefined>(undefined)

export function OrderProvider({ children }: { children: React.ReactNode }) {
	const [orders, setOrders] = useState<iOrder[]>([])
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
		orderData: Omit<iOrder, 'id' | 'orderedAt' | 'status'>
	) => {
		const newOrder: iOrder = {
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
