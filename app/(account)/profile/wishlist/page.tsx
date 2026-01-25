'use client'

import { Button } from '@/components/ui/Button/Button'
import { useCart } from '@/context/CartContext'
import { useWishlist } from '@/context/WishListContext'
import { formatPrice } from '@/lib/utils'
import { PackageSearch } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function WishlistPage() {
	const { items, removeFromWishlist } = useWishlist()
	const { addToCart } = useCart()

	const formatDate = (dateString: string) => {
		const date = new Date(dateString)
		return date.toLocaleDateString('en-US', {
			day: 'numeric',
			month: 'long',
			year: 'numeric'
		})
	}

	const handleAddToCart = (item: (typeof items)[0]) => {
		addToCart({
			id: item.id,
			slug: item.slug,
			title: item.title,
			price: item.price,
			image: item.image,
			color: 'blue',
			size: 'M',
			quantity: 1
		})
	}

	if (items.length === 0) {
		return (
			<div className='flex min-h-[60vh] flex-col items-center justify-center'>
				<div className='mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-neutral-100'>
					<PackageSearch
						className='h-12 w-12 text-neutral-500'
						strokeWidth={1.5}
					/>
				</div>
				<p className='mb-6 text-neutral-500'>
					You haven&apos;t added anything to the wishlist.
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
			<h1 className='mb-8 text-heading-h4 font-semibold text-neutral-900'>
				Wishlist
			</h1>
			<div className='space-y-6'>
				{items.map(item => (
					<div
						key={item.id}
						className='flex items-center gap-6 rounded-lg border border-neutral-light-100 p-6'
					>
						<div className='relative h-20 w-20 shrink-0 overflow-hidden rounded-md bg-neutral-100'>
							<Image
								src={item.image}
								alt={item.title}
								fill
								className='object-cover'
							/>
						</div>
						<div className='flex-1'>
							<h3 className='font-medium text-neutral-900'>
								{item.title}
							</h3>
							<p className='mt-1 text-body text-neutral-500'>
								Added On: {formatDate(item.addedAt)}
							</p>
							<button
								onClick={() => removeFromWishlist(item.id)}
								className='mt-2 text-body text-neutral-600 underline hover:text-neutral-900 cursor-pointer'
							>
								Remove Item
							</button>
						</div>
						<div className='flex items-center gap-4'>
							<p className='text-body font-semibold text-neutral-900'>
								{formatPrice(item.price)}
							</p>
							<Button
								variant='outline'
								onClick={() => handleAddToCart(item)}
							>
								Add to cart
							</Button>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
