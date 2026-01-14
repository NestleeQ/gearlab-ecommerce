import { cn, convertPrice } from '@/lib/utils'
import Image from 'next/image'
import ProductStatus from '../ProductStatus/ProductStatus'

interface iProductCard {
	className?: string
	imagePath: string
	title: string
	status: boolean
	price: number
}

export default function ProductCard({
	className,
	imagePath,
	title,
	status,
	price
}: iProductCard) {
	return (
		<div className={cn('max-w-66 max-h-109', className)}>
			<Image
				src={imagePath}
				alt={`${title}_cover`}
				width={237}
				height={312}
				className='rounded-sm'
			/>
			<div className='mt-6'>
				<p className='text-body text-neutral-900 font-medium'>
					{title}
				</p>
				<div className='flex mt-3'>
					<ProductStatus status={status} />
					<p className='text-heading-h5 text-neutral-600 ml-4'>
						{convertPrice(price)}
					</p>
				</div>
			</div>
		</div>
	)
}
