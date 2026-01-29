'use client'

import PageContainer from '@/components/layout/PageContainer/PageContainer'
import { Button } from '@/components/ui/Button/Button'
import { Input } from '@/components/ui/Input/Input'
import Text from '@/components/ui/Text/Text'
import { useAuth } from '@/context/AuthContext'
import { useZodValidation } from '@/hooks/useZodValidation'
import { accountDataSchema } from '@/lib/validationSchemas'
import { getInitials } from '@/services/reviews'
import { useEffect, useMemo, useState } from 'react'

export default function AccountPage() {
	const { user, updateAccount } = useAuth()
	const [isSuccess, setIsSuccess] = useState<boolean>(false)
	const initialValues = useMemo(
		() => ({
			name: user?.name || '',
			email: user?.email || ''
		}),
		[user?.name, user?.email]
	)

	const {
		values,
		errors,
		handleChange,
		validateForm,
		setGlobalError,
		reset
	} = useZodValidation(accountDataSchema, initialValues)

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		if (validateForm()) {
			const success = updateAccount(values.name, values.email)

			if (success) {
				setIsSuccess(true)
				reset()
			} else {
				setGlobalError('Failed to update account details')
			}
		}
	}

	useEffect(() => {
		if (user) {
			reset()
		}
	}, [user, reset])

	if (!user) return null

	if (isSuccess) {
		return (
			<>
				<PageContainer>
					<div className='text-center mt-12 py-12'>
						<Text className='text-heading-h4 text-neutral-900 font-medium'>
							Account data has been successfully updated!
						</Text>
						<Button
							variant='default'
							size='lg'
							className='mt-6 font-medium rounded-sm'
							onClick={() => setIsSuccess(false)}
						>
							Continue
						</Button>
					</div>
				</PageContainer>
			</>
		)
	}

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
							value={values.name}
							onChange={e => handleChange('name', e.target.value)}
							className='w-full py-5'
							error={errors.name}
						/>
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
							value={values.email}
							onChange={e =>
								handleChange('email', e.target.value)
							}
							className='w-full py-5'
							error={errors.email}
						/>
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
