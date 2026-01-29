'use client'

import SortSelect from '@/components/ui/SortSelect/SortSelect'
import { SortOption } from '@/data/sort.data'

interface iResultsHeader {
	showingFrom: number
	showingTo: number
	total: number
	sortBy: SortOption
	onSortChange: (value: SortOption) => void
}

export default function ResultsHeader({
	showingFrom,
	showingTo,
	total,
	sortBy,
	onSortChange
}: iResultsHeader) {
	return (
		<div className='flex justify-between items-center mb-6'>
			<div>
				<span className='text-body text-neutral-600'>
					Showing {showingFrom}-{showingTo} of {total} Results.
				</span>
			</div>
			<SortSelect
				sortBy={sortBy}
				handleSortChange={onSortChange}
			/>
		</div>
	)
}
