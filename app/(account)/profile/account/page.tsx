'use client'

import { Button } from '@/components/ui/Button/Button'
import { Input } from '@/components/ui/Input/Input'
import { useAuth } from '@/context/AuthContext'
import { cn } from '@/lib/utils'
import { getInitials } from '@/services/reviews'
import { useState } from 'react'

export interface iAccountData {
	name: string
	email: string
	global?: string
}

export default function AccountPage() {
	const { user } = useAuth()
	const [name, setName] = useState(user?.name || '')
	const [email, setEmail] = useState(user?.email || '')
	const [errors, setErrors] = useState<Partial<iAccountData>>({})

	const validateForm = (): boolean => {
		const newErrors: Partial<iAccountData> = {}

		if (!name.trim()) {
			newErrors.name = 'Name is required'
		} else if (name.length < 8) {
			newErrors.name = 'Name must be at least 8 characters long'
		}

		if (!email.trim()) {
			newErrors.email = 'Email is required'
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			newErrors.email = 'Invalid email format'
		}

		setErrors(newErrors)
		return Object.keys(newErrors).length === 0
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		if (validateForm()) {
			alert('Account details updated!')
		}
	}

	if (!user) return null

	return (
		<div>
			<h1 className='mb-8 text-heading-h4 font-semibold text-neutral-900'>
				Account Details
			</h1>
			<div className='mt-12 max-w-80 w-80'>
				<div className='mb-8 flex h-17 w-17 items-center justify-center rounded-full bg-primary-100 text-heading-h3 text-primary-900'>
					{getInitials(user.name)}
				</div>
				<form
					onSubmit={handleSubmit}
					className='space-y-6'
				>
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
							value={name}
							onChange={e => setName(e.target.value)}
							className={cn(
								'w-full py-5',
								errors.name ? 'border-red-500' : ''
							)}
						/>
						{errors.name && (
							<p className='mt-1 text-body text-red-500'>
								{errors.name}
							</p>
						)}
					</div>
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
							value={email}
							onChange={e => setEmail(e.target.value)}
							className={cn(
								'w-full py-5',
								errors.email ? 'border-red-500' : ''
							)}
						/>
						{errors.email && (
							<p className='mt-1 text-body text-red-500'>
								{errors.email}
							</p>
						)}
					</div>
					{errors.global && (
						<p className='mt-1 text-body text-red-500'>
							{errors.global}
						</p>
					)}
					<Button
						type='submit'
						size='lg'
						className='mt-5 rounded-sm'
					>
						Save Changes
					</Button>
				</form>
			</div>
		</div>
	)
}
