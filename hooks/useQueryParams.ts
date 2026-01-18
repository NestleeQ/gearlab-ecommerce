// hooks/useQueryParams.ts
'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useMemo } from 'react'

export function useQueryParams() {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()

	const params = useMemo(() => {
		return {
			category: searchParams.get('category')?.split(',') || [],
			color: searchParams.get('color')?.split(',') || [],
			size: searchParams.get('size')?.split(',') || [],
			price_min: searchParams.get('price_min') || '',
			price_max: searchParams.get('price_max') || ''
		}
	}, [searchParams])

	const updateQueryParams = useCallback(
		(updates: Record<string, string | string[] | null>) => {
			const newParams = new URLSearchParams(searchParams)

			Object.entries(updates).forEach(([key, value]) => {
				if (value === null || value === '') {
					newParams.delete(key)
				} else if (Array.isArray(value)) {
					if (value.length > 0) {
						newParams.set(key, value.join(','))
					} else {
						newParams.delete(key)
					}
				} else {
					newParams.set(key, value)
				}
			})

			router.replace(`${pathname}?${newParams.toString()}`)
		},
		[pathname, router, searchParams]
	)

	const toggleArrayParam = useCallback(
		(key: 'category' | 'color' | 'size', value: string) => {
			const current = params[key]
			const newValues = current.includes(value)
				? current.filter(v => v !== value)
				: [...current, value]

			updateQueryParams({ [key]: newValues })
		},
		[params, updateQueryParams]
	)

	const setPriceRange = useCallback(
		(min: string, max: string) => {
			updateQueryParams({
				price_min: min || null,
				price_max: max || null
			})
		},
		[updateQueryParams]
	)

	const resetFilters = useCallback(() => {
		updateQueryParams({
			category: null,
			color: null,
			size: null,
			price_min: null,
			price_max: null
		})
	}, [updateQueryParams])

	return {
		params,
		toggleArrayParam,
		updateQueryParams,
		setPriceRange,
		resetFilters
	}
}
