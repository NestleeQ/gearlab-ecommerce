import { useAuth } from '@/context/AuthContext'
import { iReview } from '@/services/reviews'
import { useState } from 'react'

export function useReviews(productId: number, initialReviews: iReview[]) {
	const { user } = useAuth()

	const [reviews, setReviews] = useState<iReview[]>(() => {
		const userReviews = getUserReviews()
		const productUserReviews = userReviews.filter(
			r => r.productId === productId
		)
		return [...productUserReviews, ...initialReviews]
	})

	const addReview = (
		newReview: Omit<iReview, 'id' | 'createdAt' | 'author' | 'userEmail'>
	) => {
		if (!user) return

		const review: iReview = {
			...newReview,
			id: Date.now(),
			createdAt: new Date().toISOString(),
			author: user.name,
			userEmail: user.email
		}

		const userReviews = getUserReviews()
		const updatedReviews = [review, ...userReviews]
		localStorage.setItem('userReviews', JSON.stringify(updatedReviews))

		setReviews(prev => [review, ...prev])

		return review
	}

	const deleteReview = (reviewId: number) => {
		if (!user) return

		const userReviews = getUserReviews()
		const review = userReviews.find(r => r.id === reviewId)

		if (review && review.userEmail === user.email) {
			const updatedReviews = userReviews.filter(r => r.id !== reviewId)
			localStorage.setItem('userReviews', JSON.stringify(updatedReviews))

			setReviews(prev => prev.filter(r => r.id !== reviewId))
			return true
		}

		return false
	}

	const canDeleteReview = (review: iReview): boolean => {
		if (!user) return false
		return review.userEmail === user.email
	}

	return {
		reviews,
		addReview,
		deleteReview,
		canDeleteReview
	}
}

function getUserReviews(): iReview[] {
	if (typeof window === 'undefined') return []

	const stored = localStorage.getItem('userReviews')
	if (!stored) return []

	try {
		return JSON.parse(stored)
	} catch {
		return []
	}
}
