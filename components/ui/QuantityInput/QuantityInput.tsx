'use client'

import { Button } from '@/components/ui/Button/Button'
import { Input } from '@/components/ui/Input/Input'
import { cn } from '@/lib/utils'
import { Minus, Plus } from 'lucide-react'

interface iQuantityInput {
	value: number
	onChange: (value: number) => void
	min?: number
	max?: number
	step?: number
	disabled?: boolean
	className?: string
	size?: 'sm' | 'md' | 'lg'
}

export default function QuantityInput({
	value,
	onChange,
	min = 1,
	max = 99,
	step = 1,
	disabled = false,
	className,
	size = 'md'
}: iQuantityInput) {
	const handleIncrement = () => {
		const newValue = value + step
		if (newValue <= max) {
			onChange(newValue)
		}
	}

	const handleDecrement = () => {
		const newValue = value - step
		if (newValue >= min) {
			onChange(newValue)
		}
	}

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = e.target.value

		if (inputValue === '') {
			onChange(min)
			return
		}

		const numValue = parseInt(inputValue, 10)

		if (!isNaN(numValue)) {
			if (numValue < min) {
				onChange(min)
			} else if (numValue > max) {
				onChange(max)
			} else {
				onChange(numValue)
			}
		}
	}

	const handleBlur = () => {
		if (value < min) {
			onChange(min)
		} else if (value > max) {
			onChange(max)
		}
	}

	const sizeClasses = {
		sm: {
			button: 'h-7 w-7',
			input: 'h-7 w-12 text-body',
			icon: 'h-3 w-3'
		},
		md: {
			button: 'h-9 w-9',
			input: 'h-9 w-16',
			icon: 'h-4 w-4'
		},
		lg: {
			button: 'h-11 w-11',
			input: 'h-11 w-20',
			icon: 'h-5 w-5'
		}
	}

	const currentSize = sizeClasses[size]

	return (
		<div className={cn('flex items-center', className)}>
			<Button
				type='button'
				variant='outline'
				size='icon'
				onClick={handleDecrement}
				disabled={disabled || value <= min}
				className={cn('rounded-r-none border-r-0', currentSize.button)}
				aria-label='Decrease quantity'
			>
				<Minus className={currentSize.icon} />
			</Button>

			<Input
				type='text'
				inputMode='numeric'
				pattern='[0-9]*'
				value={value}
				onChange={handleInputChange}
				onBlur={handleBlur}
				disabled={disabled}
				className={cn(
					'text-center rounded-none border-x-0 focus-visible:ring-0 focus-visible:ring-offset-0',
					currentSize.input
				)}
				aria-label='Quantity'
			/>

			<Button
				type='button'
				variant='outline'
				size='icon'
				onClick={handleIncrement}
				disabled={disabled || value >= max}
				className={cn('rounded-l-none border-l-0', currentSize.button)}
				aria-label='Increase quantity'
			>
				<Plus className={currentSize.icon} />
			</Button>
		</div>
	)
}
