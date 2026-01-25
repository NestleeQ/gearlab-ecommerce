'use client'
import { useWishlist } from '@/context/WishListContext'
import { useAddToCart } from '@/hooks/useAddToCart'
import { cn, formatPrice } from '@/lib/utils'
import { CirclePlus, Heart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Button } from '../Button/Button'
import ProductStatus from '../ProductStatus/ProductStatus'

interface iProductCard {
	id: number
	slug: string
	images: string[]
	title: string
	status: boolean
	price: number
	color: string
	size: string[]
}

interface iProductClass extends iProductCard {
	className?: string
}

export default function ProductCard({
	className,
	id,
	slug,
	images,
	title,
	status,
	price,
	color,
	size
}: iProductClass) {
	const [isHover, setIsHover] = useState<boolean>(false)
	const { handleAddToCart } = useAddToCart()
	const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

	const inWishlist = isInWishlist(id)

	const onAddToCart = () => {
		handleAddToCart({
			id,
			slug,
			title,
			price,
			image: images[0],
			color,
			size: size[0],
			quantity: 1
		})
	}

	const handleWishlistClick = () => {
		if (inWishlist) {
			removeFromWishlist(id)
		} else {
			addToWishlist({
				id,
				slug,
				title,
				price,
				image: images[0]
			})
		}
	}

	return (
		<div className={cn('max-w-63 max-h-109', className)}>
			<div
				className={'relative'}
				onMouseEnter={() => setIsHover(true)}
				onMouseLeave={() => setIsHover(false)}
			>
				<Image
					src={images[0]}
					alt={`${title}_cover`}
					width={228}
					height={312}
					className={cn(
						'rounded-sm max-h-75',
						isHover ? 'opacity-50' : 'opacity-100'
					)}
				/>
				<div className={isHover ? 'opacity-100' : 'opacity-0'}>
					<Button
						variant='ghost'
						className={'absolute top-0 right-0 mr-3 mt-2'}
						onClick={handleWishlistClick}
					>
						<Heart
							className={cn(
								'size-5',
								inWishlist
									? 'fill-red-500 stroke-red-500'
									: 'stroke-neutral-500'
							)}
						/>
					</Button>
					<Button
						size='lg'
						className='absolute left-0 bottom-0 w-full rounded-b-sm'
						onClick={onAddToCart}
					>
						Add to cart <CirclePlus />
					</Button>
				</div>
			</div>
			<div className='mt-6'>
				<Link
					href={`/products/${slug}`}
					className='text-body text-neutral-900 font-medium hover:text-neutral-500'
				>
					{title}
				</Link>
				<div className='flex mt-3'>
					<ProductStatus status={status} />
					<p className='text-heading-h5 text-neutral-600 ml-4'>
						{formatPrice(price)}
					</p>
				</div>
			</div>
		</div>
	)
}
