'use client'
import { iProducts } from '@/app/data/products.data'
import { cn, convertPrice } from '@/lib/utils'
import { CirclePlus, Heart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Button } from '../Button/Button'
import ProductStatus from '../ProductStatus/ProductStatus'

interface iProductCard extends iProducts {
	className?: string
}

export default function ProductCard({
	className,
	id,
	slug,
	imagePath,
	title,
	status,
	price
}: iProductCard) {
	const [isHover, setIsHover] = useState<boolean>(false)

	return (
		<div className={cn('max-w-66 max-h-109', className)}>
			<div
				className={'relative'}
				onMouseEnter={() => setIsHover(true)}
				onMouseLeave={() => setIsHover(false)}
			>
				<Image
					src={imagePath}
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
						{convertPrice(2, () => price / 100)}
					</p>
				</div>
			</div>
		</div>
	)
}
