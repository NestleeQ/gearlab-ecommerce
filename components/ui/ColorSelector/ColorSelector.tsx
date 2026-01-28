'use client'
import { cn } from '@/lib/utils'
import { ToggleGroup, ToggleGroupItem } from '../ToggleGroup/ToggleGroup'

interface iColorSelector {
	selectedColors: string[]
	onColorChange: (colors: string[]) => void
	multiple?: boolean
	availableColors?: string[]
}

const colorMap: Record<string, string> = {
	blue: 'bg-semantic-blue-400',
	yellow: 'bg-semantic-yellow-400',
	green: 'bg-semantic-green-400',
	'dark blue': 'bg-semantic-blue-900'
}

export default function ColorSelector({
	selectedColors,
	onColorChange,
	multiple = true,
	availableColors = []
}: iColorSelector) {
	return (
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
				{availableColors.map(color => {
					return (
						<ToggleGroupItem
							key={color}
							value={color}
							variant='outline'
							className={cn(
								'rounded-full hover:border hover:border-1.7 hover:border-neutral-900',
								colorMap[color],
								{
									'border border-1.7 border-neutral-900':
										selectedColors.includes(color)
								}
							)}
						/>
					)
				})}
			</ToggleGroup>
		</div>
	)
}
