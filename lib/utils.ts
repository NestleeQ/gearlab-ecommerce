import { clsx, type ClassValue } from 'clsx'

export function cn(...inputs: ClassValue[]) {
	return clsx(inputs)
}

export function convertPrice(
	minFractionDigits: number,
	formatCallback: () => number
): string {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: minFractionDigits
	}).format(formatCallback())
}
