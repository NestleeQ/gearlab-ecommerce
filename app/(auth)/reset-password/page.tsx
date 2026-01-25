'use client'
import AuthRedirect from '@/components/auth/AuthRedirect/AuthRedirect'
import PageContainer from '@/components/layout/PageContainer/PageContainer'
import { Button } from '@/components/ui/Button/Button'
import { Input } from '@/components/ui/Input/Input'
import PageTitleWide from '@/components/ui/PageTitleWide/PageTitleWide'
import Text from '@/components/ui/Text/Text'
import { useAuth } from '@/context/AuthContext'
import { cn } from '@/lib/utils'
import { MoveRight } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export interface iResetPassword {
	email: string
	newPassword: string
	confirmPassword: string
	global?: string
}

export default function ResetPasswordPage() {
	const [newPassword, setNewPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [errors, setErrors] = useState<Partial<iResetPassword>>({})
	const [email, setEmail] = useState('')
	const [isSuccess, setIsSuccess] = useState<boolean>(false)
	const { resetPassword } = useAuth()
	const router = useRouter()
	const searchParams = useSearchParams()

	useEffect(() => {
		const emailParam = searchParams.get('email')
		if (emailParam) {
			setEmail(emailParam)
		} else {
			router.push('/forgot-password')
		}
	}, [searchParams, router])

	const validateForm = (): boolean => {
		const newErrors: Partial<iResetPassword> = {}

		if (!email.trim()) {
			newErrors.email = 'Email is required'
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			newErrors.email = 'Invalid email format'
		}

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

		if (validateForm()) {
			const success = resetPassword(email, newPassword)

			if (success) {
				setIsSuccess(true)
			} else {
				setErrors({ global: 'Failed to reset password' })
			}
		}
	}

	if (isSuccess) {
		return (
			<>
				<PageTitleWide title='Reset Password' />
				<PageContainer>
					<div className='text-center mt-32 py-12'>
						<Text className='text-heading-h4 text-neutral-900 font-medium'>
							Password reset successful!
						</Text>
						<Text className='mt-1'>
							Please log in with your new password.
						</Text>
						<Button
							variant='default'
							size='lg'
							className='mt-6 font-medium rounded-sm'
							onClick={() => router.push('/login')}
						>
							Log in <MoveRight />
						</Button>
					</div>
				</PageContainer>
			</>
		)
	}

	return (
		<AuthRedirect redirectTo='/'>
			<PageTitleWide title='Reset Password' />
			<PageContainer>
				<div className='flex mt-32 items-center justify-center py-12'>
					<div className='w-full max-w-80 space-y-8'>
						<form
							onSubmit={handleSubmit}
							className='space-y-5'
						>
							<div>
								<label
									htmlFor='newPassword'
									className='mb-2 block text-body font-medium text-neutral-600'
								>
									New password
								</label>
								<Input
									id='newPassword'
									type='password'
									value={newPassword}
									onChange={e =>
										setNewPassword(e.target.value)
									}
									placeholder='Enter new password'
									className={cn(
										'w-full py-5',
										errors.newPassword
											? 'border-red-500'
											: ''
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
									Confirm password
								</label>
								<Input
									id='confirmPassword'
									type='password'
									value={confirmPassword}
									onChange={e =>
										setConfirmPassword(e.target.value)
									}
									placeholder='Confirm your password'
									className={cn(
										'w-full py-5',
										errors.confirmPassword
											? 'border-red-500'
											: ''
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
								className='w-full rounded-sm'
								size='lg'
							>
								Reset password
							</Button>
						</form>
					</div>
				</div>
			</PageContainer>
		</AuthRedirect>
	)
}
