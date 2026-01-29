import { formatPrice } from '@/lib/utils'
import { CartItem } from '@/types/cart'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../Button/Button'

interface iOrderSummary {
	items: CartItem[]
	subtotal: number
	shipping: number
	totalQuantity: number
	tax: number
	total: number
}

export default function OrderSummary({
	items,
	subtotal,
	shipping,
	totalQuantity,
	tax,
	total
}: iOrderSummary) {
	return (
		<div>
			<div className='flex items-center justify-between mb-8'>
				<h2 className='text-heading-h3 font-semibold text-neutral-900'>
					Your Order
				</h2>
				<Link href='/cart'>
					<Button
						variant='outline'
						size='lg'
					>
						Edit Cart
					</Button>
				</Link>
			</div>
			<div className='mb-8 mt-16 flex gap-4'>
				{items.slice(0, 3).map((item, index) => (
					<div
						key={index}
						className='relative h-16 w-16 overflow-hidden rounded-md bg-neutral-100'
					>
						<Image
							src={item.image}
							alt={item.title}
							fill
							className='object-cover'
						/>
					</div>
				))}
				{items.length > 3 && (
					<div className='flex h-16 w-16 items-center justify-center rounded-md bg-neutral-100 text-body font-medium text-neutral-600'>
						+{items.length - 3}
					</div>
				)}
			</div>
			<div className='space-y-4 border-t border-neutral-light-100 pt-6'>
				<div className='flex justify-between text-body'>
					<span className='text-neutral-600'>Quantity:</span>
					<span className='font-medium text-neutral-900'>
						x{totalQuantity}
					</span>
				</div>
				<div className='flex justify-between text-body'>
					<span className='text-neutral-600'>Subtotal:</span>
					<span className='font-medium text-neutral-900'>
						{formatPrice(subtotal)}
					</span>
				</div>
				<div className='flex justify-between text-body'>
					<span className='text-neutral-600'>Shipping:</span>
					<span className='font-medium text-neutral-900'>
						{shipping === 0 ? 'Free' : formatPrice(shipping)}
					</span>
				</div>
				<div className='flex justify-between text-body'>
					<span className='text-neutral-600'>Tax:</span>
					<span className='font-medium text-neutral-900'>
						{formatPrice(tax)}
					</span>
				</div>
				<div className='border-t border-neutral-light-100 pt-4'>
					<div className='flex justify-between'>
						<span className='text-heading-h5 font-semibold text-neutral-900'>
							Total
						</span>
						<span className='text-heading-h5 font-semibold text-neutral-900'>
							{formatPrice(total)}
						</span>
					</div>
				</div>
			</div>
		</div>
	)
}
