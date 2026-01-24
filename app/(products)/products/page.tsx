import PageContainer from '@/components/layout/PageContainer/PageContainer'
import CatalogSection from '@/components/sections/CatalogSection/CatalogSection'
import AppliedFilters from '@/components/ui/AppliedFilters/AppliedFilters'
import BreadcrumbComponent from '@/components/ui/BreadcrumbComponent/BreadcrumbComponent'
import ProductsFilter from '@/components/ui/ProductsFilter/ProductsFilter'

export default function Products() {
	return (
		<div>
			<div className='bg-neutral-light-100 py-6'>
				<PageContainer>
					<BreadcrumbComponent />
				</PageContainer>
			</div>
			<PageContainer className='mt-8 flex justify-between'>
				<ProductsFilter />
				<div className='ml-8 w-full'>
					<AppliedFilters />
					<CatalogSection />
				</div>
			</PageContainer>
		</div>
	)
}
