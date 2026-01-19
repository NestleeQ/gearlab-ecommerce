import PageContainer from '@/components/layout/PageContainer/PageContainer'
import CatalogSection from '@/components/sections/CatalogSection/CatalogSection'
import AppliedFilters from '@/components/ui/AppliedFilters/AppliedFilters'
import BreadcrumbComponent from '@/components/ui/BreadcrumbComponent/BreadcrumbComponent'
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious
} from '@/components/ui/Pagination/Pagination'
import ProductsFilter from '@/components/ui/ProductsFilter/ProductsFilter'

export default function Products() {
	return (
		<div>
			<div className='bg-neutral-light-100 py-6'>
				<BreadcrumbComponent />
			</div>
			<PageContainer className='mt-8 flex justify-between'>
				<ProductsFilter />
				<div className='ml-8'>
					<AppliedFilters />
					<CatalogSection />
					<Pagination className='mt-16'>
						<PaginationContent className='border rounded-sm'>
							<PaginationItem>
								<PaginationPrevious href='#' />
							</PaginationItem>
							<PaginationItem>
								<PaginationLink
									href='#'
									size='icon-sm'
								>
									1
								</PaginationLink>
							</PaginationItem>
							<PaginationItem>
								<PaginationLink
									href='#'
									isActive
									size='icon-sm'
								>
									2
								</PaginationLink>
							</PaginationItem>
							<PaginationItem>
								<PaginationLink
									href='#'
									size='icon-sm'
								>
									3
								</PaginationLink>
							</PaginationItem>
							<PaginationItem>
								<PaginationEllipsis />
							</PaginationItem>
							<PaginationItem>
								<PaginationLink
									href='#'
									size='icon-sm'
								>
									23
								</PaginationLink>
							</PaginationItem>
							<PaginationItem>
								<PaginationLink
									href='#'
									size='icon-sm'
								>
									24
								</PaginationLink>
							</PaginationItem>
							<PaginationItem>
								<PaginationNext href='#' />
							</PaginationItem>
						</PaginationContent>
					</Pagination>
				</div>
			</PageContainer>
		</div>
	)
}
