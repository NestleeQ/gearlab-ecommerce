'use client'
import PageContainer from '@/components/layout/PageContainer/PageContainer'
import { Button } from '@/components/ui/Button/Button'
import CartItemCard from '@/components/ui/CartItemCard/CartItemCard'
import PageTitleWide from '@/components/ui/PageTitleWide/PageTitleWide'
import Text from '@/components/ui/Text/Text'
import { useAuth } from '@/context/AuthContext'
import { useCart } from '@/context/CartContext'
import { useOrderTotals } from '@/hooks/useOrderTotals'
import { formatPrice } from '@/lib/utils'
import Link from 'next/link'

export default function CartPage() {
	const { items, itemCount } = useCart()
	const { isAuthenticated } = useAuth()
	const { subtotal, shipping, tax, finalTotal } = useOrderTotals()

	if (items.length == 0) {
		return (
			<>
				<PageTitleWide title='Cart' />
				<PageContainer>
					<div className='flex min-h-[60vh] flex-col items-center justify-center'>
						<Text className='text-heading-h4 font-semibold text-neutral-900'>
							Your cart is empty
						</Text>
						<Link href='/products'>
							<Button
								size='lg'
								className='mt-6 rounded-sm'
							>
								Continue Shopping
							</Button>
						</Link>
					</div>
				</PageContainer>
			</>
		)
	}

	return (
		<>
			<PageTitleWide title='Cart' />
			<PageContainer className='py-12 mt-13'>
				<div className='grid grid-cols-1 gap-12 lg:grid-cols-3'>
					<div className='lg:col-span-2'>
						<Text className='mb-8 text-heading-h3 font-semibold text-neutral-900 border-b border-neutral-light-100 pb-4.5'>
							Your cart
						</Text>
						<div className='mt-14 space-y-6'>
							{items.map((item, index) => (
								<CartItemCard
									key={`${item.id}-${item.size}-${item.color}-${index}`}
									item={item}
								/>
							))}
						</div>
					</div>
					<div className='lg:col-span-1'>
						<div className='rounded-lg border border-neutral-light-100 p-6'>
							<h2 className='mb-11 text-heading-h4 font-semibold text-neutral-900'>
								Order Summary
							</h2>
							<div className='space-y-4'>
								<div className='flex justify-between text-body'>
									<Text color={600}>Quantity</Text>
									<Text className='font-medium text-neutral-900'>
										x{itemCount}
									</Text>
								</div>
								<div className='flex justify-between text-body'>
									<Text color={600}>Subtotal</Text>
									<Text className='font-medium text-neutral-900'>
										{formatPrice(subtotal)}
									</Text>
								</div>
								<div className='flex justify-between text-body'>
									<Text color={600}>Shipping:</Text>
									<Text className='font-medium text-neutral-900'>
										{shipping === 0
											? 'Free'
											: formatPrice(shipping)}
									</Text>
								</div>
								<div className='flex justify-between text-sm'>
									<Text color={600}>Tax:</Text>
									<Text className='font-medium text-neutral-900'>
										{formatPrice(tax)}
									</Text>
								</div>
								<div className='border-t border-neutral-light-100 pt-5'>
									<div className='flex justify-between'>
										<Text className='text-heading-h5 font-semibold text-neutral-900'>
											Total
										</Text>
										<span className='text-heading-h5 font-semibold text-neutral-900'>
											{formatPrice(finalTotal)}
										</span>
									</div>
								</div>
							</div>
							{isAuthenticated ? (
								<Link href='/checkout'>
									<Button
										className='mt-6 w-full rounded-sm'
										size='lg'
									>
										Checkout
									</Button>
								</Link>
							) : (
								<Link href='/login'>
									<Button
										className='mt-6 w-full rounded-sm'
										size='lg'
									>
										Login
									</Button>
								</Link>
							)}
							<Link
								href='/products'
								className='block w-max mt-8 m-auto text-body font-medium text-neutral-900 underline cursor-pointer hover:text-neutral-500'
							>
								Continue Shopping
							</Link>
						</div>
					</div>
				</div>
			</PageContainer>
		</>
	)
}
