import { useQueryParams } from '@/hooks/useQueryParams'
import { centsToDollars, dollarsToCents } from '@/lib/utils'
import { ChangeEvent, useEffect, useState } from 'react'
import { Field } from '../Field/Field'
import { Input } from '../Input/Input'
import { Slider } from '../Slider/Slider'
import Text from '../Text/Text'

export default function PriceFilter() {
	const { params, setPriceRange } = useQueryParams()

	const currentMin = params.price_min
		? centsToDollars(parseInt(params.price_min))
		: 16
	const currentMax = params.price_max
		? centsToDollars(parseInt(params.price_max))
		: 57

	const [localValues, setLocalValues] = useState<[number, number]>([
		currentMin,
		currentMax
	])
	const [isSliderDragging, setIsSliderDragging] = useState(false)

	useEffect(() => {
		if (!isSliderDragging) {
			setTimeout(() => {
				setLocalValues([currentMin, currentMax])
			}, 0)
		}
	}, [currentMin, currentMax, isSliderDragging])

	const handleInputChange = (
		e: ChangeEvent<HTMLInputElement>,
		type: 'min' | 'max'
	) => {
		const rawValue = e.target.value.replace(/[^\d.]/g, '')
		const numValue = parseFloat(rawValue) || 0

		if (numValue <= 100) {
			const newValues: [number, number] = [...localValues]

			if (type === 'min' && numValue <= localValues[1]) {
				newValues[0] = numValue
			} else if (type === 'max' && numValue >= localValues[0]) {
				newValues[1] = numValue
			}

			setLocalValues(newValues)
		}
	}

	const handleInputBlur = () => {
		const minCents = dollarsToCents(localValues[0])
		const maxCents = dollarsToCents(localValues[1])
		setPriceRange(minCents.toString(), maxCents.toString())
	}

	const handleSliderValueChange = (values: number[]) => {
		const [min, max] = values as [number, number]
		setLocalValues([min, max])

		if (!isSliderDragging) {
			setIsSliderDragging(true)
		}
	}

	const handleSliderCommit = () => {
		if (isSliderDragging) {
			const minCents = dollarsToCents(localValues[0])
			const maxCents = dollarsToCents(localValues[1])
			setPriceRange(minCents.toString(), maxCents.toString())
			setIsSliderDragging(false)
		}
	}

	const formatForInput = (value: number): string => {
		return value === 0 ? '' : value.toFixed(2)
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
							onChange={e => handleInputChange(e, 'min')}
							onBlur={handleInputBlur}
							className='w-20'
							readOnly
						/>
						<span className='text-gray-400'>—</span>
						<Input
							type='text'
							placeholder='100'
							value={formatForInput(localValues[1])}
							onChange={e => handleInputChange(e, 'max')}
							onBlur={handleInputBlur}
							className='w-20'
							readOnly
						/>
					</div>
					<Slider
						value={localValues}
						onValueChange={handleSliderValueChange}
						onValueCommit={handleSliderCommit}
						max={100}
						min={0}
						step={1}
						className='mt-4 w-full'
						aria-label='Price Range'
					/>
					<div className='flex justify-between mt-1'>
						<span className='text-body text-gray-500'>$0</span>
						<span className='text-body text-gray-500'>$100</span>
					</div>
				</Field>
			</div>
		</>
	)
}
