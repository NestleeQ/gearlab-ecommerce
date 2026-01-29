'use client'
import AuthRedirect from '@/components/auth/AuthRedirect/AuthRedirect'
import PageContainer from '@/components/layout/PageContainer/PageContainer'
import { Button } from '@/components/ui/Button/Button'
import { Input } from '@/components/ui/Input/Input'
import PageTitleWide from '@/components/ui/PageTitleWide/PageTitleWide'
import Text from '@/components/ui/Text/Text'
import { useAuth } from '@/context/AuthContext'
import { useZodValidation } from '@/hooks/useZodValidation'
import {
	ResetPasswordFormData,
	resetPasswordSchema
} from '@/lib/validationSchemas'
import { MoveRight } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const initialValues: ResetPasswordFormData = {
	email: '',
	newPassword: '',
	confirmPassword: ''
}

export default function ResetPasswordPage() {
	const { values, errors, handleChange, validateForm, setGlobalError } =
		useZodValidation(resetPasswordSchema, initialValues)
	const [isSuccess, setIsSuccess] = useState<boolean>(false)
	const { resetPassword } = useAuth()
	const router = useRouter()
	const searchParams = useSearchParams()

	useEffect(() => {
		const emailParam = searchParams.get('email')
		if (emailParam) {
			handleChange('email', emailParam)
		} else {
			router.push('/forgot-password')
		}
	}, [searchParams, router, handleChange])

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		if (validateForm()) {
			const success = resetPassword(values.email, values.newPassword)

			if (success) {
				setIsSuccess(true)
			} else {
				setGlobalError('Failed to reset password')
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
									value={values.newPassword}
									onChange={e =>
										handleChange(
											'newPassword',
											e.target.value
										)
									}
									placeholder='Enter new password'
									className='w-full py-5'
									error={errors.newPassword}
								/>
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
									value={values.confirmPassword}
									onChange={e =>
										handleChange(
											'confirmPassword',
											e.target.value
										)
									}
									placeholder='Confirm your password'
									className='w-full py-5'
									error={errors.confirmPassword}
								/>
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
