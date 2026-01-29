'use client'
import CatalogEmptyState from '@/components/ui/CatalogEmptyState/CatalogEmptyState'
import PaginationComponent from '@/components/ui/PaginationComponent/PaginationComponent'
import ProductsGrid from '@/components/ui/ProductsGrid/ProductsGrid'
import ResultsHeader from '@/components/ui/ResultHeader/ResultHeader'
import CatalogSkeleton from '@/components/ui/Skeletons/CatalogSkeleton/CatalogSkeleton'
import { SortOption } from '@/data/sort.data'
import { useQueryParams } from '@/hooks/useQueryParams'
import {
	getFilteredProducts,
	iProduct,
	Size,
	sortProducts
} from '@/services/products'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

interface iProductsData {
	products: iProduct[]
	total: number
}

export default function CatalogSection() {
	const { params, clearFilters, setPage } = useQueryParams()
	const [productsData, setProductsData] = useState<iProductsData>({
		products: [],
		total: 0
	})
	const [loading, setLoading] = useState<boolean>(true)
	const [sortBy, setSortBy] = useState<SortOption>('relevance')

	const [targetPage, setTargetPage] = useState<number>(1)
	const currentPage = parseInt(params.page) || 1
	const itemsPerPage = 8

	const abortControllerRef = useRef<AbortController | null>(null)

	const filters = useMemo(
		() => ({
			category: params.category.length > 0 ? params.category : undefined,
			color: params.color.length > 0 ? params.color : undefined,
			size: params.size.length > 0 ? (params.size as Size[]) : undefined,
			minPrice: params.price_min ? parseInt(params.price_min) : undefined,
			maxPrice: params.price_max ? parseInt(params.price_max) : undefined,
			page: currentPage,
			limit: itemsPerPage
		}),
		[params, currentPage]
	)

	useEffect(() => {
		setTargetPage(currentPage)
	}, [currentPage])

	useEffect(() => {
		const loadFilteredProducts = async () => {
			if (abortControllerRef.current) {
				abortControllerRef.current.abort()
			}

			abortControllerRef.current = new AbortController()
			const requestPage = filters.page

			setLoading(true)

			try {
				const filteredProducts = await getFilteredProducts(filters)

				if (
					requestPage === currentPage &&
					!abortControllerRef.current.signal.aborted
				) {
					setProductsData(filteredProducts)
				}
			} catch (error: unknown) {
				if (
					!(
						error instanceof DOMException &&
						error.name === 'AbortError'
					)
				) {
					console.error('Error loading products: ', error)
				}
			} finally {
				if (!abortControllerRef.current.signal.aborted) {
					setLoading(false)
				}
			}
		}

		loadFilteredProducts()

		return () => {
			if (abortControllerRef.current) {
				abortControllerRef.current.abort()
			}
		}
	}, [filters, currentPage])

	const sortedProducts = useMemo(() => {
		return sortProducts([...productsData.products], sortBy)
	}, [productsData.products, sortBy])

	const handleSortChange = useCallback((value: string) => {
		setSortBy(value as SortOption)
	}, [])

	const handlePageChange = useCallback(
		(page: number) => {
			setTargetPage(page)
			setLoading(true)
			setProductsData({ products: [], total: 0 })
			setPage(page)
			window.scrollTo({ top: 0, behavior: 'smooth' })
		},
		[setPage]
	)

	if (loading || targetPage !== currentPage) {
		return <CatalogSkeleton />
	}

	if (productsData.products.length === 0) {
		return <CatalogEmptyState onClearFilters={clearFilters} />
	}

	return (
		<div>
			<ResultsHeader
				showingFrom={(currentPage - 1) * itemsPerPage + 1}
				showingTo={Math.min(
					currentPage * itemsPerPage,
					productsData.total
				)}
				total={productsData.total}
				sortBy={sortBy}
				onSortChange={handleSortChange}
			/>
			<div className='mt-4'>
				<ProductsGrid products={sortedProducts} />
			</div>
			<PaginationComponent
				currentPage={currentPage}
				totalItems={productsData.total}
				itemsPerPage={itemsPerPage}
				onPageChange={handlePageChange}
			/>
		</div>
	)
}
