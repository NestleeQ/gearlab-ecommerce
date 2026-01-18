import { useQueryParams } from '@/hooks/useQueryParams'
import { ChangeEvent, useState } from 'react'
import { Field, FieldDescription } from '../Field/Field'
import { Input } from '../Input/Input'
import { Slider } from '../Slider/Slider'
import Text from '../Text/Text'

export default function PriceFilter() {
	const { params, setPriceRange } = useQueryParams()

	const [localValues, setLocalValues] = useState<[number, number]>([
		parseInt(params.price_min) || 1600,
		parseInt(params.price_max) || 5700
	])

	const [tempValues, setTempValues] = useState<[number, number]>(localValues)
	const [isSliderDragging, setIsSliderDragging] = useState(false)

	const currentMin = parseInt(params.price_min) || 1600
	const currentMax = parseInt(params.price_max) || 5700

	if (localValues[0] !== currentMin || localValues[1] !== currentMax) {
		setLocalValues([currentMin, currentMax])
		setTempValues([currentMin, currentMax])
	}

	const handleInputChange = (
		e: ChangeEvent<HTMLInputElement>,
		type: 'min' | 'max'
	) => {
		const rawValue = e.target.value.replace(/\s/g, '').replace(/\D/g, '')
		const numValue = parseInt(rawValue) || 0

		if (numValue <= 10000) {
			const newValues: [number, number] = [...localValues]

			if (type === 'min' && numValue <= localValues[1]) {
				newValues[0] = numValue
			} else if (type === 'max' && numValue >= localValues[0]) {
				newValues[1] = numValue
			}

			setLocalValues(newValues)
			setTempValues(newValues)
		}
	}

	const handleInputBlur = () => {
		setPriceRange(localValues[0].toString(), localValues[1].toString())
	}

	const handleSliderValueChange = (values: number[]) => {
		const [min, max] = values as [number, number]
		setTempValues([min, max])
		setIsSliderDragging(true)
	}

	const handleSliderCommit = () => {
		if (isSliderDragging) {
			setLocalValues(tempValues)
			setPriceRange(tempValues[0].toString(), tempValues[1].toString())
			setIsSliderDragging(false)
		}
	}

	const formatForInput = (value: number): string => {
		return value === 0 ? '' : value.toLocaleString('en-US')
	}

	return (
		<>
			<Text className='text-neutral-900 font-medium'>Price</Text>
			<div className='mt-4 w-full max-w-md'>
				<Field>
					<FieldDescription className='flex justify-between items-center gap-4'>
						<Input
							type='text'
							placeholder='0'
							value={formatForInput(localValues[0])}
							onChange={e => handleInputChange(e, 'min')}
							onBlur={handleInputBlur}
							className='w-20'
						/>
						<span className='text-gray-400'>—</span>
						<Input
							type='text'
							placeholder='10 000'
							value={formatForInput(localValues[1])}
							onChange={e => handleInputChange(e, 'max')}
							onBlur={handleInputBlur}
							className='w-20'
						/>
					</FieldDescription>

					<Slider
						value={isSliderDragging ? tempValues : localValues}
						onValueChange={handleSliderValueChange}
						onValueCommit={handleSliderCommit}
						max={10000}
						min={0}
						step={100}
						className='mt-6 w-full'
						aria-label='Price Range'
					/>

					<div className='flex justify-between mt-2'>
						<span className='text-sm text-gray-500'>$0</span>
						<span className='text-sm text-gray-500'>$10 000</span>
					</div>
				</Field>
			</div>
		</>
	)
}
