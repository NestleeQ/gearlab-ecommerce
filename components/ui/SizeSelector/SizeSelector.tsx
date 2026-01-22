'use client'

import { cn } from '@/lib/utils'
import { getSizeOptions } from '@/services/products'
import { ToggleGroup, ToggleGroupItem } from '../ToggleGroup/ToggleGroup'

interface iSizeSelector {
	selectedSizes: string[]
	onSizeChange: (sizes: string[]) => void
	multiple?: boolean
	availableSizes?: string[]
}

export default function SizeSelector({
	selectedSizes,
	onSizeChange,
	multiple = true,
	availableSizes
}: iSizeSelector) {
	const sizeOptions =
		availableSizes !== undefined ? availableSizes : getSizeOptions()

	return (
		<>
			<div>
				<ToggleGroup
					type={multiple ? 'multiple' : 'single'}
					className='space-x-2.5'
					value={multiple ? selectedSizes : selectedSizes[0]}
					onValueChange={values => {
						if (multiple) {
							onSizeChange(values as string[])
						} else {
							onSizeChange(values ? [values as string] : [])
						}
					}}
				>
					{sizeOptions.map(elem => {
						const isSelected = selectedSizes.includes(elem)
						return (
							<ToggleGroupItem
								key={elem}
								value={elem}
								variant='outline'
								className={cn(
									'rounded-sm border hover:border hover:border-1.7 hover:border-neutral-900',
									{
										'border border-1.7 border-neutral-900':
											isSelected
									}
								)}
								aria-label={`Size ${elem}`}
							>
								{elem.toUpperCase()}
							</ToggleGroupItem>
						)
					})}
				</ToggleGroup>
			</div>
		</>
	)
}
