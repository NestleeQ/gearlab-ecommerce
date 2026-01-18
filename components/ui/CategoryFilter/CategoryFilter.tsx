import { categoriesList } from '@/app/data/categories.data'
import { useQueryParams } from '@/hooks/useQueryParams'
import { Checkbox } from '../Checkbox/Checkbox'
import Text from '../Text/Text'

export default function CategoryFilter() {
	const { params, toggleArrayParam } = useQueryParams()
	const selectedCategories = params.category

	return (
		<>
			<Text className={'text-neutral-900 font-medium'}>Categories</Text>
			<div className='mt-4'>
				{categoriesList.map(elem => {
					return (
						<div
							key={elem.value}
							className='relative flex items-center after:absolute after:bottom-0 after:w-full after:h-px after:bg-neutral-light-200 py-3'
						>
							<Checkbox
								id={elem.value}
								checked={selectedCategories.includes(
									elem.value
								)}
								onCheckedChange={() =>
									toggleArrayParam('category', elem.value)
								}
							/>
							<label
								htmlFor={elem.value}
								className='ml-2.5 text-body text-neutral-600'
							>
								{elem.label}
							</label>
						</div>
					)
				})}
			</div>
		</>
	)
}
