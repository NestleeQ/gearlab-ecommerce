'use client'
import { ReviewSortOption } from '@/data/sort.data'
import { iReview, sortReviews } from '@/services/reviews'
import { useMemo, useState } from 'react'
import { Button } from '../Button/Button'
import ReviewCard from '../ReviewCard/ReviewCard'
import ReviewSortSelect from '../ReviewSortSelect/ReviewSortSelect'

interface ReviewsListProps {
	reviews: iReview[]
	initialDisplay?: number
}

export default function ReviewsList({
	reviews,
	initialDisplay = 3
}: ReviewsListProps) {
	const [displayCount, setDisplayCount] = useState(initialDisplay)
	const [sortBy, setSortBy] = useState<ReviewSortOption>('newest')

	const sortedReviews = useMemo(() => {
		return sortReviews(reviews, sortBy)
	}, [reviews, sortBy])

	const visibleReviews = sortedReviews.slice(0, displayCount)
	const hasMore = displayCount < sortedReviews.length

	const loadMore = () => {
		setDisplayCount(prev => Math.min(prev + 3, sortedReviews.length))
	}

	const handleSortChange = (value: ReviewSortOption) => {
		setSortBy(value)
		setDisplayCount(initialDisplay)
	}

	if (reviews.length === 0) {
		return (
			<div className='flex flex-col items-center justify-center py-12'>
				<p className='text-neutral-500'>No reviews yet</p>
				<p className='mt-2 text-sm text-neutral-400'>
					Be the first to review this product
				</p>
			</div>
		)
	}

	return (
		<div className='flex flex-col'>
			<div className='flex items-center justify-end border-b border-neutral-light-100 pb-6'>
				<ReviewSortSelect
					sortBy={sortBy}
					onSortChange={handleSortChange}
				/>
			</div>
			<div className='mt-8 flex flex-col gap-8'>
				{visibleReviews.map(review => (
					<ReviewCard
						key={review.id}
						review={review}
					/>
				))}
			</div>
			{hasMore && (
				<div className='mt-12 flex justify-center'>
					<Button
						variant='outline'
						onClick={loadMore}
						className='min-w-52'
					>
						Load more reviews
					</Button>
				</div>
			)}
		</div>
	)
}
