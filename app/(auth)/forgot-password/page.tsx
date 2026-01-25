'use client'
import AuthRedirect from '@/components/auth/AuthRedirect/AuthRedirect'
import PageContainer from '@/components/layout/PageContainer/PageContainer'
import { Button } from '@/components/ui/Button/Button'
import { Input } from '@/components/ui/Input/Input'
import PageTitleWide from '@/components/ui/PageTitleWide/PageTitleWide'
import { useAuth } from '@/context/AuthContext'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function ForgotPasswordPage() {
	const [email, setEmail] = useState('')
	const [error, setError] = useState('')
	const { checkEmailExists } = useAuth()
	const router = useRouter()

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		setError('')

		if (!email) {
			setError('Please enter your email')
			return
		}

		const exists = checkEmailExists(email)

		if (exists) {
			router.push(`/reset-password?email=${encodeURIComponent(email)}`)
		} else {
			setError('No account found with this email')
		}
	}

	return (
		<AuthRedirect redirectTo='/'>
			<PageTitleWide title='Forgot Password' />
			<PageContainer>
				<div className='flex mt-32 items-center justify-center py-12'>
					<div className='w-full max-w-80 space-y-8'>
						<div>
							<p className='text-body leading-relaxed text-neutral-600'>
								Please enter the email address associated with
								your account. We&apos;ll promptly send you a
								link to reset your password.
							</p>
						</div>
						<form
							onSubmit={handleSubmit}
							className='space-y-5'
						>
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
									placeholder='Enter your email'
									className={cn(
										'w-full py-5',
										error ? 'border-red-500' : ''
									)}
								/>
								{error && (
									<p className='mt-1 text-body text-red-500'>
										{error}
									</p>
								)}
							</div>
							<Button
								type='submit'
								className='w-full rounded-sm'
								size='lg'
							>
								Send reset link
							</Button>
						</form>
					</div>
				</div>
			</PageContainer>
		</AuthRedirect>
	)
}
