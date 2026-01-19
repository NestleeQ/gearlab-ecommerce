import { filtersData } from '@/app/data/filters.data'
import { productsCatalog } from '@/app/data/products.data'
import ProductCard from '@/components/ui/ProductCard/ProductCard'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue
} from '@/components/ui/Select/Select'
import Text from '@/components/ui/Text/Text'

export default function CatalogSection() {
	return (
		<div>
			<div className='flex justify-between items-center'>
				<Text className='text-label font-medium'>
					Showing 1-9 of 36 Results.
				</Text>
				<Select>
					<SelectTrigger size='sm'>
						<SelectValue placeholder='SORT BY' />
					</SelectTrigger>
					<SelectContent position='popper'>
						<SelectGroup>
							<SelectLabel>SORT BY</SelectLabel>
							{filtersData.map(elem => {
								return (
									<SelectItem
										key={elem.value}
										value={elem.value}
									>
										{elem.label}
									</SelectItem>
								)
							})}
						</SelectGroup>
					</SelectContent>
				</Select>
			</div>
			<div className='mt-4 flex flex-wrap gap-4.5 space-y-8'>
				{productsCatalog.map(elem => {
					return (
						<ProductCard
							key={elem.id}
							id={elem.id}
							slug={elem.slug}
							imagePath={elem.imagePath}
							title={elem.title}
							status={elem.status}
							price={elem.price}
						/>
					)
				})}
			</div>
		</div>
	)
}
