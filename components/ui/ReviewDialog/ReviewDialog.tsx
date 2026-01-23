'use client'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogHeader,
	DialogTitle
} from '@/components/ui/Dialog/Dialog'
import { Input } from '@/components/ui/Input/Input'
import { Textarea } from '@/components/ui/Textarea/Textarea'
import { cn } from '@/lib/utils'
import { iReview } from '@/services/reviews'
import { Star } from 'lucide-react'
import { useState } from 'react'
import { Button } from '../Button/Button'

interface iReviewDialog {
	open: boolean
	onOpenChange: (open: boolean) => void
	onSubmit: (review: Omit<iReview, 'id' | 'createdAt'>) => void
	productId: number
}

export default function ReviewDialog({
	open,
	onOpenChange,
	onSubmit,
	productId
}: iReviewDialog) {
	const [email, setEmail] = useState('')
	const [fullName, setFullName] = useState('')
	const [comment, setComment] = useState('')
	const [rating, setRating] = useState(0)
	const [hoveredRating, setHoveredRating] = useState(0)
	const [errors, setErrors] = useState<{
		email?: string
		fullName?: string
		comment?: string
		rating?: string
	}>({})

	const validateForm = () => {
		const newErrors: typeof errors = {}

		if (!email.trim()) {
			newErrors.email = 'Email is required'
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			newErrors.email = 'Invalid email format'
		}

		if (!fullName.trim()) {
			newErrors.fullName = 'Full name is required'
		}

		if (!comment.trim()) {
			newErrors.comment = 'Review is required'
		} else if (comment.trim().length < 10) {
			newErrors.comment = 'Review must be at least 10 characters'
		}

		if (rating === 0) {
			newErrors.rating = 'Please select a rating'
		}

		setErrors(newErrors)
		return Object.keys(newErrors).length === 0
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		if (!validateForm()) return

		onSubmit({
			productId,
			author: fullName.trim(),
			rating,
			comment: comment.trim()
		})

		setEmail('')
		setFullName('')
		setComment('')
		setRating(0)
		setErrors({})
		onOpenChange(false)
	}

	const handleClose = () => {
		setEmail('')
		setFullName('')
		setComment('')
		setRating(0)
		setErrors({})
		onOpenChange(false)
	}

	return (
		<Dialog
			open={open}
			onOpenChange={onOpenChange}
		>
			<DialogContent className='max-w-md px-8 py-7'>
				<DialogHeader className='relative after:absolute after:w-full after:h-px after:bg-neutral-light-200 after:bottom-0 after:translate-y-4'>
					<DialogTitle className='text-heading-h4 font-semibold relative'>
						Write Review
					</DialogTitle>
					<DialogClose
						className='rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 w-5'
						onClick={handleClose}
					>
						<span className='sr-only'>Close</span>
					</DialogClose>
				</DialogHeader>
				<form
					onSubmit={handleSubmit}
					className='mt-8 space-y-6'
				>
					<div>
						<label
							htmlFor='email'
							className='mb-4 block text-sm font-medium text-neutral-900'
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
								errors.email ? 'border-red-500' : ''
							)}
						/>
						{errors.email && (
							<p className='mt-1 text-xs text-red-500'>
								{errors.email}
							</p>
						)}
					</div>
					<div className='mt-3.5'>
						<label
							htmlFor='fullName'
							className='mb-2 block text-sm font-medium text-neutral-900'
						>
							Full name
						</label>
						<Input
							id='fullName'
							type='text'
							value={fullName}
							onChange={e => setFullName(e.target.value)}
							placeholder='Enter your full name'
							className={cn(
								'w-full py-5',
								errors.fullName ? 'border-red-500' : ''
							)}
						/>
						{errors.fullName && (
							<p className='mt-1 text-xs text-red-500'>
								{errors.fullName}
							</p>
						)}
					</div>
					<div className='mt-3.5'>
						<label
							htmlFor='review'
							className='mb-2 block text-sm font-medium text-neutral-900'
						>
							Review
						</label>
						<Textarea
							id='review'
							value={comment}
							onChange={e => setComment(e.target.value)}
							placeholder='Write your review here...'
							className={cn(
								'w-full resize-none h-32 max-h-32',
								errors.comment ? 'border-red-500' : ''
							)}
						/>
						{errors.comment && (
							<p className='mt-1 text-xs text-red-500'>
								{errors.comment}
							</p>
						)}
					</div>
					<div className='mt-3.5'>
						<div className='flex items-center gap-2'>
							{Array.from({ length: 5 }).map((_, index) => {
								const starValue = index + 1
								return (
									<button
										key={index}
										type='button'
										onClick={() => setRating(starValue)}
										onMouseEnter={() =>
											setHoveredRating(starValue)
										}
										onMouseLeave={() => setHoveredRating(0)}
										className='transition-transform hover:scale-110'
									>
										<Star
											className={`h-6 w-6 ${
												starValue <=
												(hoveredRating || rating)
													? 'fill-neutral-900 text-neutral-900'
													: 'fill-neutral-300 text-neutral-300'
											}`}
										/>
									</button>
								)
							})}
						</div>
						{errors.rating && (
							<p className='mt-1 text-xs text-red-500'>
								{errors.rating}
							</p>
						)}
					</div>
					<Button
						type='submit'
						size='lg'
						className='w-full mt-5 rounded-md py-6'
					>
						Submit Your Review
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	)
}
