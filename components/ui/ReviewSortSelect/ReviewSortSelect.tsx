import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/Select/Select'
import { ReviewSortOption, reviewSortOptions } from '@/data/sort.data'

interface ReviewSortSelectProps {
	sortBy: ReviewSortOption
	onSortChange: (value: ReviewSortOption) => void
}

export default function ReviewSortSelect({
	sortBy,
	onSortChange
}: ReviewSortSelectProps) {
	return (
		<Select
			value={sortBy}
			onValueChange={onSortChange}
		>
			<SelectTrigger className='w-48 border-neutral-300'>
				<SelectValue />
			</SelectTrigger>
			<SelectContent>
				{reviewSortOptions.map(option => (
					<SelectItem
						key={option.value}
						value={option.value}
					>
						{option.label}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	)
}
