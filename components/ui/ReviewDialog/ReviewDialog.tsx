'use client'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogHeader,
	DialogTitle
} from '@/components/ui/Dialog/Dialog'
import { Textarea } from '@/components/ui/Textarea/Textarea'
import { useAuth } from '@/context/AuthContext'
import { useZodValidation } from '@/hooks/useZodValidation'
import { ReviewFormData, reviewSchema } from '@/lib/validationSchemas'
import { iReview } from '@/services/reviews'
import { Star } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '../Button/Button'

interface iReviewDialog {
	open: boolean
	onOpenChange: (open: boolean) => void
	onSubmit: (
		review: Omit<iReview, 'id' | 'createdAt' | 'author' | 'userEmail'>
	) => void
	productId: number
}

export default function ReviewDialog({
	open,
	onOpenChange,
	onSubmit,
	productId
}: iReviewDialog) {
	const { user } = useAuth()

	const initialReviewData: ReviewFormData = {
		email: user?.email || '',
		fullName: user?.name || '',
		comment: '',
		rating: 0
	}

	const {
		values,
		errors,
		handleChange,
		handleNumberChange,
		validateForm,
		reset,
		setValues
	} = useZodValidation(reviewSchema, initialReviewData)
	const [hoveredRating, setHoveredRating] = useState(0)

	useEffect(() => {
		if (user) {
			setValues({
				email: user.email,
				fullName: user.name,
				comment: '',
				rating: 0
			})
		}
	}, [user, setValues])

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		if (validateForm()) {
			onSubmit({
				productId,
				rating: values.rating,
				comment: values.comment.trim()
			})
			reset()
			onOpenChange(false)
		}
	}

	const handleClose = () => {
		reset()
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
							htmlFor='review'
							className='mb-2 block text-body font-medium text-neutral-900'
						>
							Review
						</label>
						<Textarea
							id='review'
							value={values.comment}
							onChange={e =>
								handleChange('comment', e.target.value)
							}
							placeholder='Write your review here...'
							className='w-full resize-none h-32 max-h-32'
							error={errors.comment}
						/>
					</div>
					<div className='mt-3.5'>
						<label className='mb-2 block text-body font-medium text-neutral-900'>
							Rating
						</label>
						<div className='flex items-center gap-2'>
							{Array.from({ length: 5 }).map((_, index) => {
								const starValue = index + 1
								return (
									<button
										key={index}
										type='button'
										onClick={() =>
											handleNumberChange(
												'rating',
												starValue
											)
										}
										onMouseEnter={() =>
											setHoveredRating(starValue)
										}
										onMouseLeave={() => setHoveredRating(0)}
										className='transition-transform hover:scale-110'
									>
										<Star
											className={`h-6 w-6 ${
												starValue <=
												(hoveredRating || values.rating)
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
