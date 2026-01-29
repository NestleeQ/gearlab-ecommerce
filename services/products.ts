import productData from '@/data/products.json'
import { SortOption } from '@/data/sort.data'
import { colorMap } from '@/lib/color-map'

export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL'

export interface iProduct {
	id: number
	slug: string
	images: string[]
	title: string
	price: number
	status: boolean
	category: string
	color: string[]
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

const reverseColorMap: { [key: string]: string } = Object.fromEntries(
	Object.entries(colorMap).map(([key, value]) => [value, key])
)

export function getAllProductSlugs(): string[] {
	const seen = new Set<string>()

	return products.reduce<string[]>((acc, product) => {
		const normalized = product.slug.trim().toLowerCase()
		if (!seen.has(normalized)) {
			seen.add(normalized)
			acc.push(normalized)
		}
		return acc
	}, [])
}

export async function getProductsBySlug(
	slug: string
): Promise<iProduct | null> {
	if (!slug || typeof slug !== 'string') {
		return null
	}
	const normalizedSlug = slug.trim().toLowerCase()

	console.log(slug)

	return (
		products.find(p => p.slug.trim().toLowerCase() === normalizedSlug) ||
		null
	)
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

export async function getSimilarProducts(
	currentProduct: iProduct,
	limit: number = 4
): Promise<iProduct[]> {
	if (!currentProduct) {
		return getRandomProducts(limit)
	}

	const sameCategory = products.filter(
		product =>
			product.id !== currentProduct.id &&
			product.category === currentProduct.category
	)

	if (sameCategory.length >= limit) {
		return sameCategory.sort((a, b) => a.price - b.price).slice(0, limit)
	}

	const otherProducts = products.filter(
		product =>
			product.id !== currentProduct.id &&
			product.category !== currentProduct.category
	)

	const needed = limit - sameCategory.length
	const fromOther = otherProducts
		.sort((a, b) => a.price - b.price)
		.slice(0, needed)

	return [...sameCategory, ...fromOther]
}

function getRandomProducts(count: number): iProduct[] {
	const shuffled = [...products].sort(() => Math.random() - 0.5)
	return shuffled.slice(0, count)
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

export interface FilteredProductsResult {
	products: iProduct[]
	total: number
}

export async function getFilteredProducts(filters?: {
	category?: string[]
	color?: string[]
	size?: Size[]
	minPrice?: number
	maxPrice?: number
	page?: number
	limit?: number
}): Promise<FilteredProductsResult> {
	if (!filters) return { products, total: products.length }

	let filtered = [...products]

	if (filters.category && filters.category.length > 0) {
		filtered = filtered.filter(product =>
			filters.category!.includes(product.category)
		)
	}

	if (filters.color && filters.color.length > 0) {
		const readableColors = filters.color.map(
			tc => reverseColorMap[tc] || tc
		)
		filtered = filtered.filter(product =>
			product.color.some(color => readableColors.includes(color))
		)
	}

	if (filters.size && filters.size.length > 0) {
		filtered = filtered.filter(product =>
			product.size.some(s => filters.size!.includes(s))
		)
	}

	if (filters.minPrice !== undefined) {
		const minPriceDollars = filters.minPrice / 100
		filtered = filtered.filter(product => product.price >= minPriceDollars)
	}

	if (filters.maxPrice !== undefined) {
		const maxPriceDollars = filters.maxPrice / 100
		filtered = filtered.filter(product => product.price <= maxPriceDollars)
	}

	const total = filtered.length

	if (filters.page !== undefined && filters.limit !== undefined) {
		const startIndex = (filters.page - 1) * filters.limit
		const endIndex = startIndex + filters.limit
		filtered = filtered.slice(startIndex, endIndex)
	} else if (filters.limit !== undefined) {
		filtered = filtered.slice(0, filters.limit)
	}

	return { products: filtered, total }
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

export function getSizeOptions(): Size[] {
	const availableSizes = new Set<Size>()

	products.forEach(product => {
		product.size.forEach(size => {
			availableSizes.add(size)
		})
	})

	const sizeOrder: Size[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

	return sizeOrder.filter(size => availableSizes.has(size))
}
