import reviewsData from '@/data/reviews.json'
import { ReviewSortOption } from '@/data/sort.data'

export interface iReview {
	id: number
	productId: number
	author: string
	rating: number
	comment: string
	createdAt: string
	userEmail?: string
}

const reviews: iReview[] = reviewsData.reviews as iReview[]

export async function getReviewsByProductId(
	productId: number,
	limit?: number
): Promise<iReview[]> {
	const productReviews = reviews.filter(
		review => review.productId === productId
	)

	if (limit) {
		return productReviews.slice(0, limit)
	}

	return productReviews
}

export async function getAverageRating(productId: number): Promise<number> {
	const productReviews = reviews.filter(
		review => review.productId === productId
	)

	if (productReviews.length === 0) return 0

	const sum = productReviews.reduce((acc, review) => acc + review.rating, 0)
	return Math.round((sum / productReviews.length) * 10) / 10
}

export async function getReviewsCount(productId: number): Promise<number> {
	return reviews.filter(review => review.productId === productId).length
}

export function formatReviewDate(dateString: string): string {
	const date = new Date(dateString)
	const now = new Date()
	const diffTime = Math.abs(now.getTime() - date.getTime())
	const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
	const diffWeeks = Math.floor(diffDays / 7)
	const diffMonths = Math.floor(diffDays / 30)

	if (diffDays < 7) {
		return diffDays === 0
			? 'Today'
			: `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
	} else if (diffWeeks < 4) {
		return `${diffWeeks} week${diffWeeks > 1 ? 's' : ''} ago`
	} else if (diffMonths < 12) {
		return `${diffMonths} month${diffMonths > 1 ? 's' : ''} ago`
	} else {
		return date.toLocaleDateString('en-US', {
			day: 'numeric',
			month: 'long',
			year: 'numeric'
		})
	}
}

export function getInitials(name: string): string {
	const nameParts = name.split(' ')
	if (nameParts.length >= 2) {
		return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase()
	}
	return name.substring(0, 2).toUpperCase()
}

export function sortReviews(
	reviews: iReview[],
	sortBy: ReviewSortOption
): iReview[] {
	const sorted = [...reviews]

	switch (sortBy) {
		case 'newest':
			return sorted.sort(
				(a, b) =>
					new Date(b.createdAt).getTime() -
					new Date(a.createdAt).getTime()
			)
		case 'oldest':
			return sorted.sort(
				(a, b) =>
					new Date(a.createdAt).getTime() -
					new Date(b.createdAt).getTime()
			)
		case 'highest-rating':
			return sorted.sort((a, b) => b.rating - a.rating)
		case 'lowest-rating':
			return sorted.sort((a, b) => a.rating - b.rating)
		default:
			return sorted
	}
}
