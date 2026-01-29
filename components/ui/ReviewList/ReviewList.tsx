'use client'
import { useAuth } from '@/context/AuthContext'
import { ReviewSortOption } from '@/data/sort.data'
import { useReviews } from '@/hooks/useReviews'
import { cn } from '@/lib/utils'
import { iReview, sortReviews } from '@/services/reviews'
import { useMemo, useState } from 'react'
import { Button } from '../Button/Button'
import ReviewCard from '../ReviewCard/ReviewCard'
import ReviewDialog from '../ReviewDialog/ReviewDialog'
import ReviewSortSelect from '../ReviewSortSelect/ReviewSortSelect'

interface iReviewsList {
	reviews: iReview[]
	productId: number
	initialDisplay?: number
	className?: string
}

export default function ReviewsList({
	reviews: initialReviews,
	productId,
	initialDisplay = 3,
	className
}: iReviewsList) {
	const { isAuthenticated } = useAuth()
	const { reviews, addReview, deleteReview, canDeleteReview } = useReviews(
		productId,
		initialReviews
	)

	const [displayCount, setDisplayCount] = useState(initialDisplay)
	const [sortBy, setSortBy] = useState<ReviewSortOption>('newest')
	const [isDialogOpen, setIsDialogOpen] = useState(false)

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

	const handleSubmitReview = (
		newReview: Omit<iReview, 'id' | 'createdAt' | 'author' | 'userEmail'>
	) => {
		const review = addReview(newReview)
		if (review) {
			setSortBy('newest')
			setDisplayCount(initialDisplay)
		}
	}

	const handleDeleteReview = (reviewId: number) => {
		deleteReview(reviewId)
	}

	if (reviews.length === 0) {
		return (
			<>
				<div className='flex flex-col items-center justify-center py-12'>
					<p className='text-neutral-500'>No reviews yet</p>
					<p className='mt-2 text-body text-neutral-400'>
						Be the first to review this product
					</p>
					{isAuthenticated && (
						<Button
							variant='outline'
							onClick={() => setIsDialogOpen(true)}
							className='mt-4'
						>
							Write a review
						</Button>
					)}
				</div>
				{isAuthenticated && (
					<ReviewDialog
						open={isDialogOpen}
						onOpenChange={setIsDialogOpen}
						onSubmit={handleSubmitReview}
						productId={productId}
					/>
				)}
			</>
		)
	}

	return (
		<div className={cn('flex flex-col', className)}>
			<div className='flex items-center justify-between border-b border-neutral-light-100 pb-6'>
				{isAuthenticated && (
					<Button
						variant='outline'
						size='lg'
						className='min-w-32 font-medium'
						onClick={() => setIsDialogOpen(true)}
					>
						Write a review
					</Button>
				)}
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
						canDelete={canDeleteReview(review)}
						onDelete={() => handleDeleteReview(review.id)}
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
			{isAuthenticated && (
				<ReviewDialog
					open={isDialogOpen}
					onOpenChange={setIsDialogOpen}
					onSubmit={handleSubmitReview}
					productId={productId}
				/>
			)}
		</div>
	)
}
