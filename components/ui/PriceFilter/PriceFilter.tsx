import { useQueryParams } from '@/hooks/useQueryParams'
import { ChangeEvent, useEffect, useState } from 'react'
import { Field } from '../Field/Field'
import { Input } from '../Input/Input'
import { Slider } from '../Slider/Slider'
import Text from '../Text/Text'

const MAX_PRICE = 15000

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
	const [isSliderDragging, setIsSliderDragging] = useState(false)

	useEffect(() => {
		if (!isSliderDragging) {
			const timer = setTimeout(() => {
				setLocalValues([currentMin, currentMax])
			}, 0)

			return () => clearTimeout(timer)
		}
	}, [currentMin, currentMax, isSliderDragging])

	const handleInputChange = (
		e: ChangeEvent<HTMLInputElement>,
		type: 'min' | 'max'
	) => {
		const rawValue = e.target.value.replace(/[^\d]/g, '')
		const numValue = parseInt(rawValue) || 0

		if (numValue <= MAX_PRICE) {
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
		setPriceRange(localValues[0].toString(), localValues[1].toString())
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
			setPriceRange(localValues[0].toString(), localValues[1].toString())
			setIsSliderDragging(false)
		}
	}

	const formatForInput = (value: number): string => {
		return Math.round(value).toString()
	}

	const formatForDisplay = (value: number): string => {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
			minimumFractionDigits: 0,
			maximumFractionDigits: 0
		}).format(value)
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
							placeholder={MAX_PRICE.toString()}
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
						max={MAX_PRICE}
						min={0}
						step={10}
						className='mt-4 w-full'
						aria-label='Price Range'
					/>
					<div className='flex justify-between mt-1'>
						<span className='text-body text-gray-500'>
							{formatForDisplay(0)}
						</span>
						<span className='text-body text-gray-500'>
							{formatForDisplay(MAX_PRICE)}
						</span>
					</div>
				</Field>
			</div>
		</>
	)
}
