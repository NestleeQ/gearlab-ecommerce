import { Input } from '@/components/ui/Input/Input'
import { SearchIcon } from 'lucide-react'

export default function Search() {
	return (
		<div className='relative'>
			<label
				htmlFor='search'
				className='flex items-center absolute left-3 bottom-0 top-0'
			>
				<SearchIcon
					className='text-neutral-300 bg-white'
					width={18}
					height={18}
				/>
			</label>
			<Input
				type='text'
				name='search'
				placeholder='Search products'
				className='indent-7 w-66'
			/>
		</div>
	)
}
