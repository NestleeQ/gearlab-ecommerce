import productData from '@/data/products.json'
import { SortOption } from '@/data/sort.data'

type Size = 'M' | 'L' | 'XL' | 'XXL'

export interface iProduct {
	id: number
	slug: string
	images: string[]
	title: string
	price: number
	status: boolean
	category: string
	color: string
	size: Size[]
	rating: number
	reviewCount: number
	salesCount: number
	isPopular: boolean
	isBestSeller: boolean
	isNew: boolean
	createdAt: string
	description: string
	features: string[]
}

const products: iProduct[] = productData.products as iProduct[]

export async function getAllProducts(limit = 4): Promise<iProduct[]> {
	return products.slice(0, limit)
}

export async function getProductsBySlug(
	slug: string
): Promise<iProduct | null> {
	return products.find(p => p.slug === slug) || null
}

export async function getBestSellers(limit = 4): Promise<iProduct[]> {
	return [...products]
		.sort((a, b) => b.salesCount - a.salesCount)
		.slice(0, limit)
}

export async function getPopularProducts(
	limit = 4
): Promise<iProduct[] | null> {
	return products
		.filter(p => p.isPopular)
		.sort((a, b) => b.rating - a.rating)
		.slice(0, limit)
}

export async function getNewProducts(limit = 4): Promise<iProduct[]> {
	return products
		.filter(p => p.isNew)
		.sort(
			(a, b) =>
				new Date(b.createdAt).getTime() -
				new Date(a.createdAt).getTime()
		)
		.slice(0, limit)
}

export async function getFilteredProducts(filters?: {
	category?: string[]
	color?: string[]
	size?: string[]
	minPrice?: number
	maxPrice?: number
	limit?: number
}): Promise<iProduct[]> {
	if (!filters) return products

	let filtered = [...products]

	if (filters.category && filters.category.length > 0) {
		filtered = filtered.filter(product =>
			filters.category!.includes(product.category)
		)
	}

	if (filters.color && filters.color.length > 0) {
		filtered = filtered.filter(product =>
			filters.color!.includes(product.color)
		)
	}

	if (filters.size && filters.size.length > 0) {
		filtered = filtered.filter(product =>
			product.size.some(s => filters.size!.includes(s))
		)
	}

	if (filters.minPrice !== undefined) {
		filtered = filtered.filter(
			product => product.price >= filters.minPrice!
		)
	}

	if (filters.maxPrice !== undefined) {
		filtered = filtered.filter(
			product => product.price <= filters.maxPrice!
		)
	}

	if (filters.limit !== undefined) {
		filtered = filtered.slice(0, filters.limit)
	}

	return filtered
}

export function sortProducts(
	products: iProduct[],
	sortBy: SortOption
): iProduct[] {
	const sorted = [...products]

	switch (sortBy) {
		case 'new':
			return sorted.sort(
				(a, b) =>
					new Date(b.createdAt).getTime() -
					new Date(a.createdAt).getTime()
			)
		case 'popular':
			return sorted.sort((a, b) => b.salesCount - a.salesCount)
		case 'price-asc':
			return sorted.sort((a, b) => a.price - b.price)
		case 'price-desc':
			return sorted.sort((a, b) => b.price - a.price)
		case 'rating':
			return sorted.sort((a, b) => b.rating - a.rating)
		case 'relevance':
		default:
			return sorted.sort((a, b) => b.salesCount * 0.4 + b.rating * 0.6)
	}
}

export function getSizeOptions(): Array<{
	value: string
	label: string
	count: number
}> {
	const sizeMap = new Map<string, number>()

	products.forEach(product => {
		product.size.forEach(size => {
			const count = sizeMap.get(size) || 0
			sizeMap.set(size, count + 1)
		})
	})

	const sizeOrder = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

	return sizeOrder
		.filter(size => sizeMap.has(size))
		.map(size => ({
			value: size,
			label: size,
			count: sizeMap.get(size) || 0
		}))
}
