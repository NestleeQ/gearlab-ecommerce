import { clsx, type ClassValue } from 'clsx'

export function cn(...inputs: ClassValue[]) {
	return clsx(inputs)
}

export function formatPrice(priceInCents: number): string {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 2
	}).format(priceInCents)
}

export function centsToDollars(cents: number): number {
	return cents / 100
}

export function dollarsToCents(dollars: number): number {
	return Math.round(dollars * 100)
}

export function parsePriceInput(value: string): number {
	const cleanValue = value.replace(/[^\d.]/g, '')
	const dollars = parseFloat(cleanValue) || 0
	return dollarsToCents(dollars)
}
