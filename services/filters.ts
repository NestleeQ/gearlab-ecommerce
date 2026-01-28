import productsData from '@/data/products.json'

export interface ICategory {
	name: string
	count: number
}

export interface IColor {
	color: string
	count: number
}

export interface ISize {
	size: string
	count: number
}

export async function getCategories(): Promise<ICategory[]> {
	// Подсчитываем количество товаров в каждой категории
	const categoryCounts: Record<string, number> = {}

	productsData.products.forEach(product => {
		categoryCounts[product.category] =
			(categoryCounts[product.category] || 0) + 1
	})

	return Object.entries(categoryCounts).map(([name, count]) => ({
		name,
		count
	}))
}

export async function getColors(): Promise<IColor[]> {
	const allColors = productsData.products.flatMap(p => p.color)
	const colorCounts: Record<string, number> = {}

	allColors.forEach(color => {
		colorCounts[color] = (colorCounts[color] || 0) + 1
	})

	// Возвращаем цвета с количеством
	return Object.entries(colorCounts).map(([color, count]) => ({
		color,
		count
	}))
}

export async function getSizes(): Promise<ISize[]> {
	const allSizes = productsData.products.flatMap(p => p.size)
	const sizeCounts: Record<string, number> = {}

	allSizes.forEach(size => {
		sizeCounts[size] = (sizeCounts[size] || 0) + 1
	})

	return Object.entries(sizeCounts).map(([size, count]) => ({
		size,
		count
	}))
}
