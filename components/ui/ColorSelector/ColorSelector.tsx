import { colorMap } from '@/lib/color-map'
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
	availableColors = []
}: iColorSelector) {
	const handleMultipleChange = (values: string[]) => {
		onColorChange(values)
	}

	const handleSingleChange = (value: string) => {
		onColorChange(value ? [value] : [])
	}

	const renderItems = () =>
		availableColors.map(color => {
			const isSelected = selectedColors.includes(color)
			return (
				<ToggleGroupItem
					key={color}
					value={color}
					variant='outline'
					className={cn(
						'rounded-full transition-all duration-200',
						colorMap[color],
						isSelected
							? 'ring-2 ring-neutral-300 ring-offset-2 ring-offset-neutral-100'
							: 'hover:ring-2 hover:ring-neutral-300 hover:ring-offset-2 hover:ring-offset-neutral-50 transition-all'
					)}
				/>
			)
		})

	return (
		<div>
			{multiple ? (
				<ToggleGroup
					type='multiple'
					className='space-x-2.5'
					value={selectedColors}
					onValueChange={handleMultipleChange}
				>
					{renderItems()}
				</ToggleGroup>
			) : (
				<ToggleGroup
					type='single'
					className='space-x-2.5'
					value={selectedColors[0]}
					onValueChange={handleSingleChange}
				>
					{renderItems()}
				</ToggleGroup>
			)}
		</div>
	)
}
