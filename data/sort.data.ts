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
