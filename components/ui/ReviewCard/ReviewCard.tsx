import { formatReviewDate, getInitials, iReview } from '@/services/reviews'
import { Star } from 'lucide-react'

interface iReviewCard {
	review: iReview
}

export default function ReviewCard({ review }: iReviewCard) {
	const initials = getInitials(review.author)
	const formattedDate = formatReviewDate(review.createdAt)

	return (
		<div className='flex gap-4 border-b border-neutral-light-100 pb-8 last:border-b-0'>
			<div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-100 text-body font-medium text-primary-900'>
				{initials}
			</div>
			<div className='flex-1'>
				<div className='flex items-start justify-between'>
					<div>
						<h4 className='text-body font-medium text-neutral-900'>
							{review.author}
						</h4>
						<p className='mt-1 text-xs uppercase tracking-wider text-neutral-500'>
							{formattedDate}
						</p>
					</div>
					<div className='flex gap-0.5'>
						{Array.from({ length: 5 }).map((_, index) => (
							<Star
								key={index}
								className={`h-4 w-4 ${
									index < review.rating
										? 'fill-neutral-500 text-neutral-500'
										: 'fill-neutral-300 text-neutral-300'
								}`}
							/>
						))}
					</div>
				</div>
				<p className='mt-4 text-body leading-relaxed text-neutral-500'>
					{review.comment}
				</p>
			</div>
		</div>
	)
}
