export interface Order {
	id: string
	productId: number
	productTitle: string
	productImage: string
	productSlug: string
	price: number
	quantity: number
	subtotal: number
	shipping: number
	tax: number
	total: number
	status: 'processing' | 'completed' | 'cancelled'
	orderedAt: string
}
