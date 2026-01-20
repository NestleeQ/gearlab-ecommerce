import { useQueryParams } from '@/hooks/useQueryParams'
import { cn } from '@/lib/utils'
import { getSizeOptions } from '@/services/products'
import Text from '../Text/Text'
import { ToggleGroup, ToggleGroupItem } from '../ToggleGroup/ToggleGroup'

export default function SizeFilter() {
	const { params, updateQueryParams } = useQueryParams()
	const selectedSizes = params.size
	const sizeOptions = getSizeOptions()

	return (
		<>
			<Text className={'text-neutral-900 font-medium'}>Size</Text>
			<div className='mt-4'>
				<ToggleGroup
					type='multiple'
					className='flex flex-wrap space-x-2.5'
					value={selectedSizes}
					onValueChange={values => {
						if (values.length > 0) {
							updateQueryParams({ size: values })
						} else {
							updateQueryParams({ size: null })
						}
					}}
				>
					{sizeOptions.map(elem => {
						const isSelected = selectedSizes.includes(elem.value)
						return (
							<ToggleGroupItem
								key={elem.value}
								value={elem.value}
								variant='outline'
								className={cn(
									'rounded-sm border hover:border hover:border-1.7 hover:border-neutral-900',
									{
										'border border-1.7 border-neutral-900':
											isSelected
									}
								)}
								aria-label={`Size ${elem.label}`}
							>
								{elem.label.toUpperCase()}
							</ToggleGroupItem>
						)
					})}
				</ToggleGroup>
			</div>
		</>
	)
}
