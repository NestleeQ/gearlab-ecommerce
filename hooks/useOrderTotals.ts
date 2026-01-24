import { useCart } from '@/context/CartContext'

export function useOrderTotals(
	shippingCost: number = 0,
	taxRate: number = 0.03
) {
	const { total } = useCart()

	const subtotal = total
	const shipping = shippingCost
	const tax = subtotal * taxRate
	const finalTotal = subtotal + shipping + tax

	return {
		subtotal,
		shipping,
		tax,
		finalTotal: finalTotal,
		itemsTotal: total
	}
}
