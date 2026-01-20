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
			price_max: searchParams.get('price_max') || '',
			page: searchParams.get('page') || '1'
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

	const setPage = (page: number) => {
		const newParams = new URLSearchParams(searchParams)
		newParams.set('page', page.toString())
		router.replace(`${pathname}?${newParams.toString()}`)
	}

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

	const removeFilter = useCallback(
		(
			key: 'category' | 'color' | 'size' | 'price_min' | 'price_max',
			valueToRemove?: string
		) => {
			if (key === 'price_min' || key === 'price_max') {
				updateQueryParams({
					price_min: null,
					price_max: null
				})
			} else if (
				valueToRemove &&
				['category', 'color', 'size'].includes(key)
			) {
				const current = params[key]
				const newValues = current.filter(v => v !== valueToRemove)
				updateQueryParams({ [key]: newValues })
			} else {
				updateQueryParams({ [key]: null })
			}
		},
		[params, updateQueryParams]
	)

	const clearFilters = useCallback(() => {
		resetFilters()
	}, [resetFilters])

	const getAllParams = useMemo(() => {
		const allParams: Record<string, string> = {}

		Object.entries(params).forEach(([key, value]) => {
			if (Array.isArray(value) && value.length > 0) {
				allParams[key] = value.join(',')
			} else if (typeof value === 'string' && value) {
				allParams[key] = value
			}
		})

		const otherKeys = ['sort', 'order', 'search', 'page']
		otherKeys.forEach(key => {
			const value = searchParams.get(key)
			if (value) {
				allParams[key] = value
			}
		})

		return allParams
	}, [params, searchParams])

	return {
		params,
		allParams: getAllParams,
		toggleArrayParam,
		updateQueryParams,
		setPriceRange,
		resetFilters,
		removeFilter,
		clearFilters,
		setPage
	}
}
