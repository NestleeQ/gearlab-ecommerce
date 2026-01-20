'use client'
import CatalogEmptyState from '@/components/ui/CatalogEmptyState/CatalogEmptyState'
import CatalogSkeleton from '@/components/ui/CatalogSkeleton/CatalogSkeleton'
import PaginationComponent from '@/components/ui/PaginationComponent/PaginationComponent'
import ProductCard from '@/components/ui/ProductCard/ProductCard'
import SortSelect from '@/components/ui/SortSelect/SortSelect'
import Text from '@/components/ui/Text/Text'
import { SortOption } from '@/data/sort.data'
import { useQueryParams } from '@/hooks/useQueryParams'
import {
	getFilteredProducts,
	iProduct,
	sortProducts
} from '@/services/products'
import { useCallback, useEffect, useMemo, useState } from 'react'

export default function CatalogSection() {
	const { params, clearFilters, setPage } = useQueryParams()
	const [products, setProducts] = useState<iProduct[]>([])
	const [loading, setLoading] = useState<boolean>(true)
	const [sortBy, setSortBy] = useState<SortOption>('relevance')
	const currentPage = parseInt(params.page) || 1
	const itemsPerPage = 10

	const filters = useMemo(
		() => ({
			category: params.category.length > 0 ? params.category : undefined,
			color: params.color.length > 0 ? params.color : undefined,
			size: params.size.length > 0 ? params.size : undefined,
			minPrice: params.price_min ? parseInt(params.price_min) : undefined,
			maxPrice: params.price_max ? parseInt(params.price_max) : undefined,
			page: currentPage
		}),
		[params, currentPage]
	)

	useEffect(() => {
		const loadFilteredProducts = async () => {
			setLoading(true)
			setProducts([])

			try {
				const filteredProducts = await getFilteredProducts(filters)
				setProducts(filteredProducts)
			} catch (error) {
				console.error('Error loading products: ', error)
			} finally {
				setLoading(false)
			}
		}

		loadFilteredProducts()
	}, [filters])

	const sortedProducts = useMemo(() => {
		return sortProducts([...products], sortBy)
	}, [products, sortBy])

	const paginatedProducts = useMemo(() => {
		const startIndex = (currentPage - 1) * itemsPerPage
		const endIndex = startIndex + itemsPerPage
		return sortedProducts.slice(startIndex, endIndex)
	}, [sortedProducts, currentPage, itemsPerPage])

	const handleSortChange = useCallback((value: string) => {
		setSortBy(value as SortOption)
	}, [])

	const handlePageChange = useCallback(
		(page: number) => {
			setPage(page)
			window.scrollTo({ top: 0, behavior: 'smooth' })
		},
		[setPage]
	)

	if (loading && products.length === 0) {
		return <CatalogSkeleton />
	}

	if (!loading && sortedProducts.length === 0) {
		return <CatalogEmptyState onClearFilters={clearFilters} />
	}

	return (
		<div>
			<div className='flex justify-between items-center'>
				<Text className='text-label font-medium'>
					Showing {(currentPage - 1) * itemsPerPage + 1}-
					{Math.min(
						currentPage * itemsPerPage,
						sortedProducts.length
					)}{' '}
					of {sortedProducts.length} Results.
				</Text>
				<SortSelect
					sortBy={sortBy}
					handleSortChange={handleSortChange}
				/>
			</div>
			<div className='mt-4 flex flex-wrap gap-4.5 space-y-8'>
				{paginatedProducts.map(elem => {
					return (
						<ProductCard
							key={elem.id}
							slug={elem.slug}
							images={elem.images}
							title={elem.title}
							status={elem.status}
							price={elem.price}
						/>
					)
				})}
				<PaginationComponent
					currentPage={currentPage}
					totalItems={sortedProducts.length}
					itemsPerPage={itemsPerPage}
					onPageChange={handlePageChange}
				/>
			</div>
		</div>
	)
}
