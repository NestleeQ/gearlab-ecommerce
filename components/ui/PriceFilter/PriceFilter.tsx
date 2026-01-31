import { useQueryParams } from '@/hooks/useQueryParams'
import { formatPrice } from '@/lib/utils'
import { useEffect, useRef, useState } from 'react'
import { Field } from '../Field/Field'
import { Input } from '../Input/Input'
import { Slider } from '../Slider/Slider'
import Text from '../Text/Text'

const MAX_PRICE = 14000

export default function PriceFilter() {
	const { params, setPriceRange } = useQueryParams()

	const currentMin = params.price_min ? parseFloat(params.price_min) : 0
	const currentMax = params.price_max
		? parseFloat(params.price_max)
		: MAX_PRICE

	const [localValues, setLocalValues] = useState<[number, number]>([
		currentMin,
		currentMax
	])

	const isInternalChange = useRef(false)

	useEffect(() => {
		if (isInternalChange.current) {
			isInternalChange.current = false
			return
		}

		const timer = setTimeout(() => {
			setLocalValues([currentMin, currentMax])
		}, 0)

		return () => clearTimeout(timer)
	}, [currentMin, currentMax])

	const handleSliderValueChange = (values: number[]) => {
		const [min, max] = values as [number, number]
		setLocalValues([min, max])
	}

	const handleSliderCommit = (values: number[]) => {
		const [min, max] = values as [number, number]
		isInternalChange.current = true
		setPriceRange(min.toString(), max.toString())
	}

	// Форматирование с разделителем тысяч
	const formatForInput = (value: number): string => {
		return new Intl.NumberFormat('en-US').format(Math.round(value))
	}

	return (
		<>
			<Text className='text-neutral-900 font-medium'>Price</Text>
			<div className='w-full max-w-md'>
				<Field>
					<div className='flex justify-between items-center gap-4'>
						<Input
							type='text'
							placeholder='0'
							value={formatForInput(localValues[0])}
							className='w-20 cursor-default'
							readOnly
							tabIndex={-1}
						/>
						<span className='text-gray-400'>—</span>
						<Input
							type='text'
							placeholder={MAX_PRICE.toString()}
							value={formatForInput(localValues[1])}
							className='w-20 cursor-default'
							readOnly
							tabIndex={-1}
						/>
					</div>
					<Slider
						value={localValues}
						onValueChange={handleSliderValueChange}
						onValueCommit={handleSliderCommit}
						max={MAX_PRICE}
						min={0}
						step={10}
						className='mt-4 w-full'
						aria-label='Price Range'
					/>
					<div className='flex justify-between mt-1'>
						<span className='text-body text-gray-500'>
							{formatPrice(0, false)}
						</span>
						<span className='text-body text-gray-500'>
							{formatPrice(MAX_PRICE, false)}
						</span>
					</div>
				</Field>
			</div>
		</>
	)
}
