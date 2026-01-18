import { productColors } from '@/app/data/products.data'
import { useQueryParams } from '@/hooks/useQueryParams'
import { cn } from '@/lib/utils'
import Text from '../Text/Text'
import { ToggleGroup, ToggleGroupItem } from '../ToggleGroup/ToggleGroup'

export default function ColorFilter() {
	const { params, toggleArrayParam } = useQueryParams()
	const selectedColor = params.color
	return (
		<>
			<Text className={'text-neutral-900 font-medium'}>Color</Text>
			<div className='mt-4'>
				<ToggleGroup
					type='multiple'
					className='space-x-2.5'
					onValueChange={values => {
						const params = new URLSearchParams(
							window.location.search
						)
						if (values.length > 0) {
							params.set('color', values.join(','))
						} else {
							params.delete('color')
						}
						window.history.replaceState(
							{},
							'',
							`?${params.toString()}`
						)
					}}
				>
					{productColors.map(elem => {
						return (
							<ToggleGroupItem
								key={elem.id}
								value={elem.color}
								variant='outline'
								className={cn(
									'rounded-full hover:border hover:border-1.7 hover:border-neutral-900',
									{
										'bg-semantic-blue-400':
											elem.color === 'blue-400',
										'bg-semantic-yellow-400':
											elem.color === 'yellow-400',
										'bg-semantic-green-400':
											elem.color === 'green-400',
										'bg-semantic-blue-900':
											elem.color === 'blue-900'
									},
									{
										'border border-1.7 border-neutral-900':
											selectedColor.includes(elem.color)
									}
								)}
								onClick={() =>
									toggleArrayParam('color', elem.color)
								}
							></ToggleGroupItem>
						)
					})}
				</ToggleGroup>
			</div>
		</>
	)
}
