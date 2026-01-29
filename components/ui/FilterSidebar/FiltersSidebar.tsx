'use client'

import FilterSection from '@/components/sections/FilterSection/FilterSection'
import PriceFilter from '@/components/ui/PriceFilter/PriceFilter'
import { useQueryParams } from '@/hooks/useQueryParams'
import { IColor } from '@/services/filters'
import { Size } from '@/services/products'

interface iFiltersSidebar {
	availableFilters: {
		availableColors: IColor[]
		availableSizes: Size[]
		availableCategories: string[]
	}
}

interface FilterConfigItem {
	title: string
	key: 'category' | 'color' | 'size'
	type: 'checkbox' | 'color' | 'size'
	options: { label: string; value: string }[]
}

export default function FiltersSidebar({ availableFilters }: iFiltersSidebar) {
	const { params, updateQueryParams } = useQueryParams()

	const filterConfig: FilterConfigItem[] = [
		{
			title: 'Categories',
			key: 'category',
			type: 'checkbox' as const,
			options: availableFilters.availableCategories.map(cat => ({
				label:
					cat.charAt(0).toUpperCase() +
					cat.slice(1).replace('-', ' '),
				value: cat
			}))
		},
		{
			title: 'Color',
			key: 'color',
			type: 'color' as const,
			options: availableFilters.availableColors.map(color => ({
				label: color.name,
				value: color.tailwindClass,
				tailwindClass: color.tailwindClass
			}))
		},
		{
			title: 'Size',
			key: 'size',
			type: 'size' as const,
			options: availableFilters.availableSizes.map(size => ({
				label: size,
				value: size
			}))
		}
	]

	const handleFilterChange =
		(key: 'category' | 'color' | 'size') => (values: string[]) => {
			if (values.length > 0) {
				updateQueryParams({ [key]: values })
			} else {
				updateQueryParams({ [key]: null })
			}
		}

	return (
		<div className='border border-neutral-100 rounded-md w-64 min-w-64 h-max p-6 space-y-8'>
			{filterConfig.map(section => (
				<FilterSection
					key={section.key}
					title={section.title}
					options={section.options}
					type={section.type}
					selected={params[section.key] || []}
					onChange={handleFilterChange(section.key)}
				/>
			))}
			<PriceFilter />
		</div>
	)
}
