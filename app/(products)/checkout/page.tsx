'use client'
import PageContainer from '@/components/layout/PageContainer/PageContainer'
import CheckoutForm from '@/components/ui/CheckoutForm/CheckoutForm'
import OrderSummary from '@/components/ui/OrderSummary/OrderSummary'
import PageTitleWide from '@/components/ui/PageTitleWide/PageTitleWide'
import CheckoutSkeleton from '@/components/ui/Skeletons/CheckoutSkeleton/CheckoutSkeleton'
import ThankYouScreen from '@/components/ui/ThankYouScreen/ThankYouScreen'
import { useCart } from '@/context/CartContext'
import { useOrders } from '@/context/OrderContext'
import { useMounted } from '@/hooks/useMounted'
import { useOrderTotals } from '@/hooks/useOrderTotals'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function CheckoutPage() {
	const { items, clearCart, itemCount } = useCart()
	const { addOrder } = useOrders()
	const { subtotal, shipping, tax, finalTotal } = useOrderTotals()
	const router = useRouter()
	const [orderPlaced, setOrderPlaced] = useState(false)
	const mounted = useMounted()

	useEffect(() => {
		if (mounted && items.length === 0 && !orderPlaced) {
			router.push('/cart')
		}
	}, [mounted, items.length, orderPlaced, router])

	if (!mounted) {
		return <CheckoutSkeleton />
	}

	if (items.length === 0 && !orderPlaced) {
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
			<PageContainer className='mt-16 lg:mt-25'>
				<div className='grid grid-cols-1 gap-8 lg:gap-12 lg:grid-cols-2'>
					<CheckoutForm onSubmit={handlePlaceOrder} />
					<OrderSummary
						items={items}
						subtotal={subtotal}
						shipping={shipping}
						totalQuantity={itemCount}
						tax={tax}
						total={finalTotal}
					/>
				</div>
			</PageContainer>
		</>
	)
}
