import { cn } from '@/lib/utils'
import { iReview } from '@/services/reviews'
import ReviewsList from '../ReviewList/ReviewList'
import Text from '../Text/Text'

interface iReviewProduct {
	rating: number
	review: number
	reviews: iReview[]
	className?: string
	productId: number
}
export default function ReviewProduct({
	rating,
	review,
	reviews,
	productId,
	className
}: iReviewProduct) {
	return (
		<>
			<div className={cn(className)}>
				<div className='flex items-center'>
					<h2 className='text-neutral-900 text-3xl font-bold'>
						{rating}
					</h2>
					<Text
						color={400}
						className='ml-3'
					>
						— {review} Reviews
					</Text>
				</div>
				<ReviewsList
					className={'mt-10'}
					reviews={reviews}
					productId={productId}
					initialDisplay={3}
				/>
			</div>
		</>
	)
}
