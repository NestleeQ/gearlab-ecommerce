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
