import { productColors } from '@/app/data/products.data'
import { useQueryParams } from '@/hooks/useQueryParams'
import { cn } from '@/lib/utils'
import Text from '../Text/Text'
import { ToggleGroup, ToggleGroupItem } from '../ToggleGroup/ToggleGroup'

export default function ColorFilter() {
	const { params, updateQueryParams } = useQueryParams()
	const selectedColor = params.color
	return (
		<>
			<Text className={'text-neutral-900 font-medium'}>Color</Text>
			<div className='mt-4'>
				<ToggleGroup
					type='multiple'
					className='space-x-2.5'
					value={selectedColor}
					onValueChange={values => {
						if (values.length > 0) {
							updateQueryParams({ color: values })
						} else {
							updateQueryParams({ color: null })
						}
					}}
				>
					{productColors.map(elem => {
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
											selectedColor.includes(elem.label)
									}
								)}
							></ToggleGroupItem>
						)
					})}
				</ToggleGroup>
			</div>
		</>
	)
}
