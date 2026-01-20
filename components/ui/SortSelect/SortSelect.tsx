import { sortOptions } from '@/data/sort.data'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue
} from '../Select/Select'

interface iSortSelect {
	sortBy: string
	handleSortChange: (value: string) => void
}

export default function SortSelect({ sortBy, handleSortChange }: iSortSelect) {
	return (
		<Select
			value={sortBy}
			onValueChange={handleSortChange}
		>
			<SelectTrigger size='sm'>
				<SelectValue placeholder='SORT BY' />
			</SelectTrigger>
			<SelectContent position='popper'>
				<SelectGroup>
					<SelectLabel>SORT BY</SelectLabel>
					{sortOptions.map(elem => {
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
	)
}
