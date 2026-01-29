'use client'
import { useAuth } from '@/context/AuthContext'
import { useWishlist } from '@/context/WishListContext'
import { useAddToCart } from '@/hooks/useAddToCart'
import { useMounted } from '@/hooks/useMounted'
import { cn, formatPrice } from '@/lib/utils'
import { Size } from '@/services/products'
import { CirclePlus, Heart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'sonner'
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
	size: Size[]
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
	const { isAuthenticated } = useAuth()
	const mounted = useMounted()

	const inWishlist = mounted && isInWishlist(id)

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
			toast.success('Removed from wishlist')
		} else {
			addToWishlist({
				id,
				slug,
				title,
				price,
				image: images[0]
			})
			toast.success('Added to wishlist', {
				description: `${title} has been added to your wishlist.`
			})
		}
	}

	return (
		<div className={cn('max-w-63 max-h-109', className)}>
			<div
				className='relative group'
				onMouseEnter={() => setIsHover(true)}
				onMouseLeave={() => setIsHover(false)}
			>
				<Link href={`/products/${slug}`}>
					<div className='relative overflow-hidden rounded-sm bg-neutral-50 transition-all duration-300 group-hover:border-neutral-300 group-hover:shadow-md cursor-pointer'>
						<Image
							src={images[0]}
							alt={`${title}_cover`}
							width={228}
							height={312}
							className={cn(
								'w-full h-auto object-cover transition-opacity duration-300',
								isHover ? 'opacity-50' : 'opacity-100'
							)}
						/>
					</div>
				</Link>

				<div
					className={cn(
						'absolute inset-0 transition-opacity duration-300 pointer-events-none',
						isHover ? 'opacity-100' : 'opacity-0'
					)}
				>
					{mounted && isAuthenticated && (
						<Button
							variant='ghost'
							className='absolute top-0 right-0 mr-3 mt-2 pointer-events-auto transition-transform hover:scale-110'
							onClick={handleWishlistClick}
						>
							<Heart
								className={cn(
									'size-5 transition-all duration-100',
									inWishlist
										? 'fill-red-500 stroke-red-500 animate-heart-beat'
										: 'stroke-neutral-500'
								)}
							/>
						</Button>
					)}
					<Button
						size='lg'
						className='absolute left-0 bottom-0 w-full rounded-t-none rounded-b-sm pointer-events-auto'
						onClick={onAddToCart}
					>
						Add to cart <CirclePlus />
					</Button>
				</div>
			</div>
			<div className='mt-6'>
				<Link
					href={`/products/${slug}`}
					className='text-body text-neutral-900 font-medium hover:text-neutral-500 transition-colors'
				>
					{title}
				</Link>
				<div className='flex mt-3 items-center'>
					<ProductStatus status={status} />
					<p className='text-heading-h5 text-neutral-600 ml-4'>
						{formatPrice(price)}
					</p>
				</div>
			</div>
		</div>
	)
}
