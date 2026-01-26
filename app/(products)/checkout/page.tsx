'use client'
import PageContainer from '@/components/layout/PageContainer/PageContainer'
import CheckoutForm from '@/components/ui/CheckoutForm/CheckoutForm'
import OrderSummary from '@/components/ui/OrderSummary/OrderSummary'
import PageTitleWide from '@/components/ui/PageTitleWide/PageTitleWide'
import ThankYouScreen from '@/components/ui/ThankYouScreen/ThankYouScreen'
import { useCart } from '@/context/CartContext'
import { useOrders } from '@/context/OrderContext'
import { useOrderTotals } from '@/hooks/useOrderTotals'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function CheckoutPage() {
	const { items, clearCart } = useCart()
	const { addOrder } = useOrders()
	const { subtotal, shipping, tax, finalTotal } = useOrderTotals()
	const router = useRouter()
	const [orderPlaced, setOrderPlaced] = useState(false)

	if (items.length === 0 && !orderPlaced) {
		router.push('/cart')
		return null
	}

	const handlePlaceOrder = () => {
		items.forEach(item => {
			addOrder({
				productId: item.id,
				productTitle: item.title,
				productImage: item.image,
				productSlug: item.slug,
				price: item.price,
				quantity: item.quantity,
				subtotal: subtotal,
				shipping: shipping,
				tax: tax,
				total: finalTotal
			})
		})

		clearCart()
		setOrderPlaced(true)
	}

	if (orderPlaced) {
		return <ThankYouScreen />
	}

	return (
		<>
			<PageTitleWide title='Cart' />
			<PageContainer className='mt-25'>
				<div className='grid grid-cols-1 gap-12 lg:grid-cols-2'>
					<CheckoutForm onSubmit={handlePlaceOrder} />
					<OrderSummary
						items={items}
						subtotal={subtotal}
						shipping={shipping}
						tax={tax}
						total={finalTotal}
					/>
				</div>
			</PageContainer>
		</>
	)
}
