import productsData from '@/data/products.json'
import { colorMap } from '@/lib/color-map'

export interface ICategory {
	name: string
	count: number
}

export interface IColor {
	name: string
	tailwindClass: string
	count: number
}

export interface ISize {
	size: string
	count: number
}

export async function getCategories(): Promise<ICategory[]> {
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

	return Object.entries(colorCounts).map(([color, count]) => ({
		name: color,
		tailwindClass: colorMap[color] || 'bg-neutral-200',
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
