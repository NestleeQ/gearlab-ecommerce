'use client'
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious
} from '@/components/ui/Pagination/Pagination'
import { useMemo } from 'react'

interface PaginationComponentProps {
	currentPage: number
	totalItems: number
	itemsPerPage: number
	onPageChange: (page: number) => void
}

export default function PaginationComponent({
	currentPage,
	totalItems,
	itemsPerPage,
	onPageChange
}: PaginationComponentProps) {
	const totalPages = Math.ceil(totalItems / itemsPerPage)

	const pageNumbers = useMemo(() => {
		if (totalPages <= 5) {
			return Array.from({ length: totalPages }, (_, i) => i + 1)
		}

		const pages = []
		pages.push(1)

		if (currentPage > 3) {
			pages.push('...')
		}

		const start = Math.max(2, currentPage - 1)
		const end = Math.min(totalPages - 1, currentPage + 1)

		for (let i = start; i <= end; i++) {
			pages.push(i)
		}

		if (currentPage < totalPages - 2) {
			pages.push('...')
		}

		if (totalPages > 1) {
			pages.push(totalPages)
		}

		return pages
	}, [currentPage, totalPages])

	if (totalPages <= 1) return null

	return (
		<Pagination className='mt-16'>
			<PaginationContent className='border rounded-sm'>
				<PaginationItem>
					<PaginationPrevious
						href='#'
						onClick={e => {
							e.preventDefault()
							if (currentPage > 1) onPageChange(currentPage - 1)
						}}
						className={
							currentPage === 1
								? 'opacity-50 cursor-not-allowed'
								: ''
						}
					/>
				</PaginationItem>

				{pageNumbers.map((page, index) => {
					if (page === '...') {
						return (
							<PaginationItem key={`ellipsis-${index}`}>
								<PaginationEllipsis />
							</PaginationItem>
						)
					}

					const pageNum = page as number
					return (
						<PaginationItem key={pageNum}>
							<PaginationLink
								href='#'
								isActive={currentPage === pageNum}
								size='icon-sm'
								onClick={e => {
									e.preventDefault()
									onPageChange(pageNum)
								}}
							>
								{pageNum}
							</PaginationLink>
						</PaginationItem>
					)
				})}

				<PaginationItem>
					<PaginationNext
						href='#'
						onClick={e => {
							e.preventDefault()
							if (currentPage < totalPages)
								onPageChange(currentPage + 1)
						}}
						className={
							currentPage === totalPages
								? 'opacity-50 cursor-not-allowed'
								: ''
						}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	)
}
