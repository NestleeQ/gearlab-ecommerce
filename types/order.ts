export interface iOrder {
	id: string
	productId: number
	productTitle: string
	productImage: string
	productSlug: string
	price: number
	quantity: number
	status: 'processing' | 'completed' | 'cancelled'
	orderedAt: string
}
