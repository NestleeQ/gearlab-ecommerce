'use client'
import { useQueryParams } from '@/hooks/useQueryParams'
import { formatPrice } from '@/lib/utils'
import { X } from 'lucide-react'
import { Badge } from '../Badge/Badge'
import { Button } from '../Button/Button'

export default function AppliedFilters() {
	const { allParams, removeFilter, clearFilters, updateQueryParams } =
		useQueryParams()

	const excludedKeys = ['page']

	const filteredParams = Object.fromEntries(
		Object.entries(allParams).filter(([key]) => !excludedKeys.includes(key))
	)

	const hasFilters = Object.keys(filteredParams).some(key => {
		const value = filteredParams[key]
		return value !== undefined && value !== '' && value !== '0'
	})

	if (!hasFilters) {
		return null
	}

	const getFilterDisplayName = (key: string, itemValue: string): string => {
		switch (key) {
			case 'category':
				return itemValue.charAt(0).toUpperCase() + itemValue.slice(1)
			case 'color':
				return itemValue.charAt(0).toUpperCase() + itemValue.slice(1)
			case 'size':
				return itemValue.toUpperCase()
			default:
				return itemValue
		}
	}

	const handleRemoveArrayItem = (
		key: 'category' | 'color' | 'size',
		itemToRemove: string,
		currentItems: string[]
	) => {
		const newValues = currentItems.filter(item => item !== itemToRemove)
		if (newValues.length > 0) {
			updateQueryParams({ [key]: newValues })
		} else {
			removeFilter(key)
		}
	}

	return (
		<div className='mb-6'>
			<div className='flex items-center mb-3'>
				<h3 className='text-heading-h5 font-medium text-neutral-900'>
					Applied filters:
				</h3>
				<button
					onClick={clearFilters}
					className='text-body text-semantic-blue-900 hover:text-blue-800 hover:underline cursor-pointer ml-5'
				>
					Clear all
				</button>
			</div>
			<div className='flex flex-wrap gap-2'>
				{Object.entries(filteredParams).map(([key, value]) => {
					if (!value || value === '' || value === '0') return null

					if (key === 'price_min' && allParams.price_max) {
						const min = parseInt(allParams.price_min)
						const max = parseInt(allParams.price_max)
						if (!isNaN(min) && !isNaN(max)) {
							return (
								<Badge
									variant='outline'
									key='price_range'
									className='inline-flex items-center gap-1 text-neutral-900 px-3 text-body font-normal'
								>
									<span>
										Price: {formatPrice(min)} -{' '}
										{formatPrice(max)}
									</span>
									<Button
										variant='ghost'
										size='sm'
										onClick={() => {
											removeFilter('price_min')
											removeFilter('price_max')
										}}
										className='ml-1 text-neutral-500'
									>
										<X size={19} />
									</Button>
								</Badge>
							)
						}
						return null
					}

					if (key === 'price_max') return null

					if (['category', 'color', 'size'].includes(key)) {
						const items = value.split(',')
						return items.map((item, index) => (
							<Badge
								variant='outline'
								key={`${key}-${item}-${index}`}
								className='inline-flex items-center gap-1 text-neutral-900 px-3 rounded-full text-body font-normal'
							>
								<span>
									{`${key.charAt(0).toUpperCase() + key.slice(1)}: ` +
										getFilterDisplayName(key, item)}
								</span>
								<Button
									variant='ghost'
									size='sm'
									onClick={() =>
										handleRemoveArrayItem(
											key as
												| 'category'
												| 'color'
												| 'size',
											item,
											items
										)
									}
									className=' text-neutral-500'
								>
									<X size={19} />
								</Button>
							</Badge>
						))
					}

					return (
						<div
							key={key}
							className='inline-flex items-center gap-1 bg-gray-100 text-gray-800 px-3 py-1.5 rounded-full text-sm'
						>
							<span>
								{key === 'search'
									? `"${value}"`
									: `${key}: ${value}`}
							</span>
							<button
								onClick={() => removeFilter(key as any)}
								className='ml-1 text-gray-500 hover:text-gray-700'
							>
								<X size={14} />
							</button>
						</div>
					)
				})}
			</div>
		</div>
	)
}
