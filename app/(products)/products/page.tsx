import PageContainer from '@/components/layout/PageContainer/PageContainer'
import CatalogSection from '@/components/sections/CatalogSection/CatalogSection'
import AppliedFilters from '@/components/ui/AppliedFilters/AppliedFilters'
import BreadcrumbComponent from '@/components/ui/BreadcrumbComponent/BreadcrumbComponent'
import FiltersSidebar from '@/components/ui/FilterSidebar/FiltersSidebar'
import { getCategories, getColors, getSizes } from '@/services/filters'
import { Size } from '@/services/products'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Products - GearLab',
	description: 'Browse our collection of products.'
}

export const revalidate = 60

export default async function Products() {
	const [categories, colors, sizes] = await Promise.all([
		getCategories(),
		getColors(),
		getSizes()
	])

	const availableFilters = {
		availableCategories: categories.map(c => c.name),
		availableColors: colors,
		availableSizes: sizes.map(s => s.size) as Size[]
	}

	return (
		<div>
			<div className='bg-neutral-light-100 py-6'>
				<PageContainer>
					<BreadcrumbComponent />
				</PageContainer>
			</div>
			<PageContainer className='mt-8 flex justify-between'>
				<FiltersSidebar availableFilters={availableFilters} />
				<div className='ml-8 w-full'>
					<AppliedFilters />
					<CatalogSection />
				</div>
			</PageContainer>
		</div>
	)
}
