'use client'
import { cn, formatPrice } from '@/lib/utils'
import { CirclePlus, Heart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Button } from '../Button/Button'
import ProductStatus from '../ProductStatus/ProductStatus'

interface iProductCard {
	slug: string
	images: string[]
	title: string
	status: boolean
	price: number
}

interface iProductClass extends iProductCard {
	className?: string
}

export default function ProductCard({
	className,
	slug,
	images,
	title,
	status,
	price
}: iProductClass) {
	const [isHover, setIsHover] = useState<boolean>(false)

	return (
		<div className={cn('max-w-66 max-h-109', className)}>
			<div
				className={'relative'}
				onMouseEnter={() => setIsHover(true)}
				onMouseLeave={() => setIsHover(false)}
			>
				<Image
					src={images[0]}
					alt={`${title}_cover`}
					width={237}
					height={312}
					className={cn(
						'rounded-sm',
						isHover ? 'opacity-50' : 'opacity-100'
					)}
				/>
				<div className={isHover ? 'opacity-100' : 'opacity-0'}>
					<Button
						variant='ghost'
						className={'absolute top-0 right-0 mr-3 mt-2'}
					>
						<Heart className='size-5 stroke-neutral-500' />
					</Button>
					<Button
						size='lg'
						className='absolute left-0 bottom-0 w-full rounded-b-sm'
					>
						Add to cart {<CirclePlus />}
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
