'use client'

import { iResetPassword } from '@/app/(auth)/reset-password/page'
import PageContainer from '@/components/layout/PageContainer/PageContainer'
import { Button } from '@/components/ui/Button/Button'
import { Input } from '@/components/ui/Input/Input'
import Text from '@/components/ui/Text/Text'
import { useAuth } from '@/context/AuthContext'
import { cn } from '@/lib/utils'
import { useState } from 'react'

export default function PasswordPage() {
	const [newPassword, setNewPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [errors, setErrors] = useState<Partial<iResetPassword>>({})
	const [isSuccess, setIsSuccess] = useState<boolean>(false)
	const { user, resetPassword } = useAuth()

	const validateForm = (): boolean => {
		const newErrors: Partial<iResetPassword> = {}

		if (!newPassword.trim()) {
			newErrors.newPassword = 'Password is required'
		} else if (newPassword.length < 6) {
			newErrors.newPassword =
				'Password must be at least 6 characters long'
		}

		if (!confirmPassword.trim()) {
			newErrors.confirmPassword = 'Password is required'
		} else if (newPassword.length < 6) {
			newErrors.confirmPassword =
				'Password must be at least 6 characters long'
		}

		if (newPassword !== confirmPassword) {
			newErrors.global = 'Passwords do not match'
		}

		setErrors(newErrors)
		return Object.keys(newErrors).length === 0
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		if (user) {
			if (validateForm()) {
				const success = resetPassword(user.email, newPassword)
				if (success) {
					setIsSuccess(true)
					setNewPassword('')
					setConfirmPassword('')
				} else {
					setErrors({ global: 'Failed to change password' })
				}
			}
		}
	}

	if (isSuccess) {
		return (
			<>
				<PageContainer>
					<div className='text-center mt-12 py-12'>
						<Text className='text-heading-h4 text-neutral-900 font-medium'>
							Password change successful!
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
				Change Password
			</h1>
			<div className='mt-12 max-w-80'>
				<form
					onSubmit={handleSubmit}
					className='space-y-6'
				>
					<div>
						<label
							htmlFor='newPassword'
							className='mb-2 block text-body font-medium text-neutral-600'
						>
							New Password
						</label>
						<Input
							id='newPassword'
							type='password'
							value={newPassword}
							onChange={e => setNewPassword(e.target.value)}
							className={cn(
								'w-full py-5',
								errors.newPassword ? 'border-red-500' : ''
							)}
						/>
						{errors.newPassword && (
							<p className='mt-1 text-body text-red-500'>
								{errors.newPassword}
							</p>
						)}
					</div>
					<div>
						<label
							htmlFor='confirmPassword'
							className='mb-2 block text-body font-medium text-neutral-600'
						>
							Confirm Password
						</label>
						<Input
							id='confirmPassword'
							type='password'
							value={confirmPassword}
							onChange={e => setConfirmPassword(e.target.value)}
							className={cn(
								'w-full py-5',
								errors.confirmPassword ? 'border-red-500' : ''
							)}
						/>
						{errors.confirmPassword && (
							<p className='mt-1 text-body text-red-500'>
								{errors.confirmPassword}
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
						Change password
					</Button>
				</form>
			</div>
		</div>
	)
}
