import ReviewProduct from '@/components/ui/ReviewProduct/ReviewProduct'
import { Tabs, TabsContent, TabsTrigger } from '@/components/ui/Tabs/Tabs'
import Text from '@/components/ui/Text/Text'
import { iReview } from '@/services/reviews'
import { TabsList } from '@radix-ui/react-tabs'
import { Ellipsis, Star } from 'lucide-react'

interface iProductDescription {
	details: string
	features: string[]
	rating: number
	reviewCount: number
	reviews: iReview[]
	productId: number
}

export default function ProductDescription({
	details,
	features,
	rating,
	reviewCount,
	reviews,
	productId
}: iProductDescription) {
	return (
		<Tabs
			defaultValue='details'
			className='mt-44 flex flex-row gap-12'
		>
			<TabsList className='flex h-fit w-48 flex-col items-stretch gap-0'>
				<TabsTrigger
					value='details'
					className='flex items-center justify-start gap-2 px-5 py-3 text-left data-[state=active]:bg-neutral-50'
				>
					<Ellipsis className='h-5 w-5' />
					<span className='text-body font-medium'>Details</span>
				</TabsTrigger>
				<TabsTrigger
					value='reviews'
					className='flex items-center justify-start gap-2 mt-1 px-5 py-3 text-left data-[state=active]:bg-neutral-50'
				>
					<Star className='h-5 w-5' />
					<span className='text-body font-medium'>Reviews</span>
				</TabsTrigger>
			</TabsList>
			<div className='flex-1'>
				<TabsContent
					value='details'
					className='m-0 max-w-3xl space-y-6'
				>
					<h5 className='font-semibold text-neutral-900'>Detail</h5>
					<Text color={600}>{details}</Text>
					<ul className='flex flex-col gap-1.5 mt-12'>
						{features.map((elem, index) => {
							return (
								<li
									key={index}
									className='flex items-start gap-2 text-sm text-neutral-900'
								>
									<span className='mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-600' />
									<Text color={600}>{elem}</Text>
								</li>
							)
						})}
					</ul>
				</TabsContent>
				<TabsContent
					value='reviews'
					className='m-0'
				>
					{reviews ? (
						<>
							<h5 className='font-semibold text-neutral-900'>
								Reviews
							</h5>
							<ReviewProduct
								rating={rating}
								review={reviewCount}
								reviews={reviews}
								productId={productId}
								className='mt-4 mb-'
							/>
						</>
					) : (
						<div className='text-neutral-600'>No reviews yet</div>
					)}
				</TabsContent>
			</div>
		</Tabs>
	)
}
