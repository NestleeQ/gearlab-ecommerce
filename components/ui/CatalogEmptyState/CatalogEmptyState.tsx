import Text from '@/components/ui/Text/Text'

interface iCatalogEmptyState {
	onClearFilters: () => void
}

export default function CatalogEmptyState({
	onClearFilters
}: iCatalogEmptyState) {
	return (
		<div className='mt-8 text-center py-12'>
			<Text className='text-body'>
				No products found matching your filters.
			</Text>
			<button
				onClick={onClearFilters}
				className='mt-4 text-body text-semantic-blue-900 hover:text-blue-800 hover:underline cursor-pointer'
			>
				Clear all filters
			</button>
		</div>
	)
}
