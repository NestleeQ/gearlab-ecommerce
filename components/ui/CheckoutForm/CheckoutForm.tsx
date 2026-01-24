'use client'
import { ShippingFormData } from '@/app/(products)/checkout/page'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { Button } from '../Button/Button'
import { Input } from '../Input/Input'

interface CheckoutFormProps {
	onSubmit: (data: ShippingFormData) => void
}

export default function CheckoutForm({ onSubmit }: CheckoutFormProps) {
	const [formData, setFormData] = useState<ShippingFormData>({
		streetAddress: '',
		city: '',
		state: '',
		zipCode: '',
		country: '',
		email: '',
		fullName: ''
	})

	const [errors, setErrors] = useState<Partial<ShippingFormData>>({})

	const validateForm = (): boolean => {
		const newErrors: Partial<ShippingFormData> = {}

		if (!formData.streetAddress.trim()) {
			newErrors.streetAddress = 'Street address is required'
		}

		if (!formData.city.trim()) {
			newErrors.city = 'City is required'
		}

		if (!formData.state.trim()) {
			newErrors.state = 'State is required'
		}

		if (!formData.zipCode.trim()) {
			newErrors.zipCode = 'Zip code is required'
		}

		if (!formData.country.trim()) {
			newErrors.country = 'Country is required'
		}

		if (!formData.email.trim()) {
			newErrors.email = 'Email is required'
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
			newErrors.email = 'Invalid email format'
		}

		if (!formData.fullName.trim()) {
			newErrors.fullName = 'Full name is required'
		}

		setErrors(newErrors)
		return Object.keys(newErrors).length === 0
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		if (validateForm()) {
			onSubmit(formData)
		}
	}

	const handleChange = (field: keyof ShippingFormData, value: string) => {
		setFormData(prev => ({ ...prev, [field]: value }))
		if (errors[field]) {
			setErrors(prev => ({ ...prev, [field]: undefined }))
		}
	}

	return (
		<div className='border-r border-neutral-100'>
			<h1 className='mb-8 text-heading-h3 font-semibold text-neutral-900'>
				Shipping Address
			</h1>
			<form
				onSubmit={handleSubmit}
				className='space-y-6 mt-16 max-w-115'
			>
				<div>
					<label
						htmlFor='streetAddress'
						className='mb-2 block text-body font-medium text-neutral-600'
					>
						Street Address
					</label>
					<Input
						id='streetAddress'
						type='text'
						value={formData.streetAddress}
						onChange={e =>
							handleChange('streetAddress', e.target.value)
						}
						className={cn(
							'w-full',
							errors.streetAddress ? 'border-red-500' : ''
						)}
					/>
					{errors.streetAddress && (
						<p className='mt-1 text-xs text-red-500'>
							{errors.streetAddress}
						</p>
					)}
				</div>
				<div className='grid grid-cols-2 gap-4'>
					<div>
						<label
							htmlFor='city'
							className='mb-2 block text-body font-medium text-neutral-600'
						>
							City
						</label>
						<Input
							id='city'
							type='text'
							value={formData.city}
							onChange={e => handleChange('city', e.target.value)}
							className={cn(
								'w-full',
								errors.city ? 'border-red-500' : ''
							)}
						/>
						{errors.city && (
							<p className='mt-1 text-xs text-red-500'>
								{errors.city}
							</p>
						)}
					</div>
					<div>
						<label
							htmlFor='state'
							className='mb-2 block text-body font-medium text-neutral-600'
						>
							State
						</label>
						<Input
							id='state'
							type='text'
							value={formData.state}
							onChange={e =>
								handleChange('state', e.target.value)
							}
							className={cn(
								'w-full',
								errors.state ? 'border-red-500' : ''
							)}
						/>
						{errors.state && (
							<p className='mt-1 text-xs text-red-500'>
								{errors.state}
							</p>
						)}
					</div>
				</div>
				<div className='grid grid-cols-2 gap-4'>
					<div>
						<label
							htmlFor='zipCode'
							className='mb-2 block text-body font-medium text-neutral-600'
						>
							Zip Code
						</label>
						<Input
							id='zipCode'
							type='text'
							value={formData.zipCode}
							onChange={e =>
								handleChange('zipCode', e.target.value)
							}
							className={cn(
								'w-full',
								errors.zipCode ? 'border-red-500' : ''
							)}
						/>
						{errors.zipCode && (
							<p className='mt-1 text-xs text-red-500'>
								{errors.zipCode}
							</p>
						)}
					</div>
					<div>
						<label
							htmlFor='country'
							className='mb-2 block text-body font-medium text-neutral-600'
						>
							Country
						</label>
						<Input
							id='country'
							type='text'
							value={formData.country}
							onChange={e =>
								handleChange('country', e.target.value)
							}
							className={cn(
								'w-full',
								errors.country ? 'border-red-500' : ''
							)}
						/>
						{errors.country && (
							<p className='mt-1 text-xs text-red-500'>
								{errors.country}
							</p>
						)}
					</div>
				</div>
				<div className='grid grid-cols-2 gap-4 mt-13'>
					<div>
						<label
							htmlFor='email'
							className='mb-2 block text-body font-medium text-neutral-600'
						>
							Email
						</label>
						<Input
							id='email'
							type='email'
							value={formData.email}
							onChange={e =>
								handleChange('email', e.target.value)
							}
							className={cn(
								'w-full',
								errors.email ? 'border-red-500' : ''
							)}
						/>
						{errors.email && (
							<p className='mt-1 text-xs text-red-500'>
								{errors.email}
							</p>
						)}
					</div>
					<div>
						<label
							htmlFor='fullName'
							className='mb-2 block text-body font-medium text-neutral-600'
						>
							Full name
						</label>
						<Input
							id='fullName'
							type='text'
							value={formData.fullName}
							onChange={e =>
								handleChange('fullName', e.target.value)
							}
							className={cn(
								'w-full',
								errors.fullName ? 'border-red-500' : ''
							)}
						/>
						{errors.fullName && (
							<p className='mt-1 text-xs text-red-500'>
								{errors.fullName}
							</p>
						)}
					</div>
				</div>
				<Button
					type='submit'
					className='mt-8 w-full rounded-sm'
					size='lg'
				>
					Place Order
				</Button>
			</form>
		</div>
	)
}
