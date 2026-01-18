import { productSizes } from '@/app/data/products.data'
import { useQueryParams } from '@/hooks/useQueryParams'
import { cn } from '@/lib/utils'
import Text from '../Text/Text'
import { ToggleGroup, ToggleGroupItem } from '../ToggleGroup/ToggleGroup'

export default function SizeFilter() {
	const { params, toggleArrayParam } = useQueryParams()
	const selectedSize = params.size

	return (
		<>
			<Text className={'text-neutral-900 font-medium'}>Size</Text>
			<div className='mt-4'>
				<ToggleGroup
					type='multiple'
					className='flex flex-wrap space-x-2.5 space-y-2.5'
					onValueChange={values => {
						const params = new URLSearchParams(
							window.location.search
						)
						if (values.length > 0) {
							params.set('size', values.join(','))
						} else {
							params.delete('size')
						}
						window.history.replaceState(
							{},
							'',
							`?${params.toString()}`
						)
					}}
				>
					{productSizes.map(elem => {
						return (
							<ToggleGroupItem
								key={elem.id}
								value={elem.size}
								variant='outline'
								className={cn(
									'rounded-sm border hover:border hover:border-1.7 hover:border-neutral-900',
									{
										'border border-1.7 border-neutral-900':
											selectedSize.includes(elem.size)
									}
								)}
								onClick={() =>
									toggleArrayParam('size', elem.size)
								}
							>
								{elem.size.toUpperCase()}
							</ToggleGroupItem>
						)
					})}
				</ToggleGroup>
			</div>
		</>
	)
}
