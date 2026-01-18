'use client'
import CategoryFilter from '../CategoryFilter/CategoryFilter'
import ColorFilter from '../ColorFilter/ColorFilter'
import PriceFilter from '../PriceFilter/PriceFilter'
import SizeFilter from '../SizeFilter/SizeFilter'

export default function ProductsFilter() {
	return (
		<div className='border border-neutral-100 rounded-sm max-w-62 py-5 px-4.5 pb-8'>
			<CategoryFilter />
			<div className='mt-10'>
				<ColorFilter />
			</div>
			<div className='mt-10'>
				<SizeFilter />
			</div>
			<div className='mt-10'>
				<PriceFilter />
			</div>
		</div>
	)
}
