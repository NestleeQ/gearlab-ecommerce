import { cn } from '@/lib/utils'
import { Button } from '../Button/Button'
import Text from '../Text/Text'

interface iReviewProduct {
	rating: number
	review: number
	className?: string
}
export default function ReviewProduct({
	rating,
	review,
	className
}: iReviewProduct) {
	return (
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
			<Button
				variant='outline'
				size='lg'
				className='mt-10 font-medium'
			>
				Write a review
			</Button>
		</div>
	)
}
