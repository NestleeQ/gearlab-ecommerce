'use client'
import { Button } from '@/components/ui/Button/Button'
import { useOrders } from '@/context/OrderContext'
import { cn, formatPrice } from '@/lib/utils'
import { Package } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function OrdersPage() {
	const { orders } = useOrders()

	const formatDate = (dateString: string) => {
		const date = new Date(dateString)
		return date.toLocaleDateString('en-US', {
			day: 'numeric',
			month: 'long',
			year: 'numeric'
		})
	}

	if (orders.length === 0) {
		return (
			<div className='flex min-h-[60vh] flex-col items-center justify-center'>
				<div className='mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-neutral-100'>
					<Package
						className='h-12 w-12 text-neutral-500'
						strokeWidth={1.5}
					/>
				</div>
				<p className='mb-6 text-neutral-500'>
					Your order history is waiting to be filled.
				</p>
				<Link href='/products'>
					<Button
						size='lg'
						className='rounded-sm'
					>
						Start Shopping
						<span>→</span>
					</Button>
				</Link>
			</div>
		)
	}

	return (
		<div>
			<h5 className='mb-8 text-heading-h4 font-semibold text-neutral-900'>
				Orders
			</h5>
			<div className='space-y-6'>
				{orders.map(order => (
					<div
						key={order.id}
						className='flex items-center gap-6 rounded-lg border border-neutral-light-100 p-6'
					>
						<div className='relative h-20 w-20 shrink-0 overflow-hidden rounded-md bg-neutral-100'>
							<Image
								src={order.productImage}
								alt={order.productTitle}
								fill
								className='object-cover'
							/>
						</div>
						<div className='flex-1'>
							<h3 className='font-medium text-neutral-900'>
								{order.productTitle}
							</h3>
							<p className='mt-1 text-body text-neutral-500'>
								Ordered On: {formatDate(order.orderedAt)}
							</p>
							<div className='mt-2 space-y-1 text-sm'>
								<div className='flex items-center gap-2 text-neutral-600'>
									<span>Quantity: {order.quantity}</span>
									<span className='text-neutral-300'>•</span>
									<span>{formatPrice(order.price)} each</span>
								</div>
								<div className='flex items-center gap-2'>
									{order.tax > 0 && (
										<span className='text-neutral-600'>
											Tax: {formatPrice(order.tax)}
										</span>
									)}
								</div>
								<p className='font-semibold text-neutral-900'>
									Total: {formatPrice(order.total)}
								</p>
							</div>
						</div>
						<div className='flex items-center gap-4'>
							<span
								className={cn(
									'rounded-full px-4 py-2 text-sm font-medium capitalize',
									order.status === 'processing' &&
										'bg-yellow-100 text-yellow-800',
									order.status === 'completed' &&
										'bg-green-100 text-green-800',
									order.status === 'cancelled' &&
										'bg-red-100 text-red-800'
								)}
							>
								{order.status}
							</span>
							<Link href={`/products/${order.productSlug}`}>
								<Button variant='outline'>View item</Button>
							</Link>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
