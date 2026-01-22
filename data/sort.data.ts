export type SortOption =
	| 'new'
	| 'popular'
	| 'relevance'
	| 'price-asc'
	| 'price-desc'
	| 'rating'

export const sortOptions: Array<{ value: SortOption; label: string }> = [
	{ value: 'relevance', label: 'Relevance' },
	{ value: 'new', label: 'New' },
	{ value: 'popular', label: 'Popular' },
	{ value: 'price-asc', label: 'Price: Low to High' },
	{ value: 'price-desc', label: 'Price: High to Low' },
	{ value: 'rating', label: 'Rating' }
]

export type ReviewSortOption =
	| 'newest'
	| 'oldest'
	| 'highest-rating'
	| 'lowest-rating'

export const reviewSortOptions: Array<{
	value: ReviewSortOption
	label: string
}> = [
	{ value: 'newest', label: 'Newest First' },
	{ value: 'oldest', label: 'Oldest First' },
	{ value: 'highest-rating', label: 'Highest Rating' },
	{ value: 'lowest-rating', label: 'Lowest Rating' }
]
