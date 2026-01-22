'use client'
import { productColors } from '@/data/products.data'
import { cn } from '@/lib/utils'
import { ToggleGroup, ToggleGroupItem } from '../ToggleGroup/ToggleGroup'

interface iColorSelector {
	selectedColors: string[]
	onColorChange: (colors: string[]) => void
	multiple?: boolean
	availableColors?: string[]
}

export default function ColorSelector({
	selectedColors,
	onColorChange,
	multiple = true,
	availableColors
}: iColorSelector) {
	const colors = availableColors
		? productColors.filter(color => availableColors.includes(color.label))
		: productColors

	return (
		<>
			<div>
				<ToggleGroup
					type={multiple ? 'multiple' : 'single'}
					className='space-x-2.5'
					value={multiple ? selectedColors : selectedColors[0]}
					onValueChange={values => {
						if (multiple) {
							onColorChange(values as string[])
						} else {
							onColorChange(values ? [values as string] : [])
						}
					}}
				>
					{colors.map(elem => {
						return (
							<ToggleGroupItem
								key={elem.id}
								value={elem.label}
								variant='outline'
								className={cn(
									'rounded-full hover:border hover:border-1.7 hover:border-neutral-900',
									{
										'bg-semantic-blue-400':
											elem.value === 'blue-400',
										'bg-semantic-yellow-400':
											elem.value === 'yellow-400',
										'bg-semantic-green-400':
											elem.value === 'green-400',
										'bg-semantic-blue-900':
											elem.value === 'blue-900'
									},
									{
										'border border-1.7 border-neutral-900':
											selectedColors.includes(elem.label)
									}
								)}
							/>
						)
					})}
				</ToggleGroup>
			</div>
		</>
	)
}
