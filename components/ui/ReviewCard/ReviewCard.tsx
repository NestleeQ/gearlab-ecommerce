import { formatReviewDate, getInitials, iReview } from '@/services/reviews'
import { Star, Trash2 } from 'lucide-react'
import { Button } from '../Button/Button'
import Text from '../Text/Text'

interface iReviewCard {
	review: iReview
	canDelete?: boolean
	onDelete?: () => void
}

export default function ReviewCard({
	review,
	canDelete,
	onDelete
}: iReviewCard) {
	return (
		<div className='flex gap-4 border-b border-neutral-light-100 pb-8'>
			<div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-100'>
				<span className='text-body font-medium text-primary-900'>
					{getInitials(review.author)}
				</span>
			</div>
			<div className='flex-1'>
				<div className='flex items-start justify-between'>
					<div>
						<p className='text-body font-semibold text-neutral-900'>
							{review.author}
						</p>
						<p className='text-sm text-neutral-500'>
							{formatReviewDate(review.createdAt)}
						</p>
					</div>
					<div className='flex items-center gap-2'>
						<div className='flex gap-1'>
							{Array.from({ length: 5 }).map((_, index) => (
								<Star
									key={index}
									className={`h-4 w-4 ${
										index < review.rating
											? 'fill-neutral-900 text-neutral-900'
											: 'fill-neutral-200 text-neutral-200'
									}`}
								/>
							))}
						</div>
						{canDelete && onDelete && (
							<Button
								variant='ghost'
								size='icon-sm'
								onClick={onDelete}
								className='text-red-500 hover:text-red-700'
								title='Delete review'
							>
								<Trash2 className='h-4 w-4' />
							</Button>
						)}
					</div>
				</div>
				<Text className='mt-4 text-neutral-600'>{review.comment}</Text>
			</div>
		</div>
	)
}
