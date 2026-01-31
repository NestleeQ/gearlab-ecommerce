import PageContainer from '@/components/layout/PageContainer/PageContainer'
import PageTitleWide from '../../PageTitleWide/PageTitleWide'
import { Skeleton } from '../Skeleton/Skeleton'

export default function CheckoutSkeleton() {
	return (
		<>
			<PageTitleWide title='Checkout' />
			<PageContainer className='mt-16 md:mt-18 lg:mt-24.5'>
				<div className='grid grid-cols-1 gap-8 lg:gap-12 lg:grid-cols-2'>
					<div className='lg:border-r lg:border-neutral-100'>
						<Skeleton className='mb-4 lg:mb-8 h-7 lg:h-8 w-40 lg:w-48 rounded' />
						<div className='mt-8 lg:mt-12 max-w-none lg:max-w-115 space-y-4 lg:space-y-6'>
							<div>
								<Skeleton className='mb-1.5 lg:mb-2 h-4 lg:h-5 w-28 lg:w-32 rounded' />
								<Skeleton className='h-10 lg:h-12 w-full rounded' />
							</div>
							<div className='grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4'>
								<div>
									<Skeleton className='mb-1.5 lg:mb-2 h-4 lg:h-5 w-16 lg:w-20 rounded' />
									<Skeleton className='h-10 lg:h-12 w-full rounded' />
								</div>
								<div>
									<Skeleton className='mb-1.5 lg:mb-2 h-4 lg:h-5 w-16 lg:w-20 rounded' />
									<Skeleton className='h-10 lg:h-12 w-full rounded' />
								</div>
							</div>
							<div className='grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4'>
								<div>
									<Skeleton className='mb-1.5 lg:mb-2 h-4 lg:h-5 w-20 lg:w-24 rounded' />
									<Skeleton className='h-10 lg:h-12 w-full rounded' />
								</div>
								<div>
									<Skeleton className='mb-1.5 lg:mb-2 h-4 lg:h-5 w-20 lg:w-24 rounded' />
									<Skeleton className='h-10 lg:h-12 w-full rounded' />
								</div>
							</div>
							<div className='grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4 mt-8 lg:mt-13'>
								<div>
									<Skeleton className='mb-1.5 lg:mb-2 h-4 lg:h-5 w-16 lg:w-20 rounded' />
									<Skeleton className='h-10 lg:h-12 w-full rounded' />
								</div>
								<div>
									<Skeleton className='mb-1.5 lg:mb-2 h-4 lg:h-5 w-24 lg:w-28 rounded' />
									<Skeleton className='h-10 lg:h-12 w-full rounded' />
								</div>
							</div>
							<Skeleton className='mt-4 lg:mt-5 h-12 w-full sm:w-40 rounded-sm' />
						</div>
					</div>
					<div className='mt-8 lg:mt-0'>
						<div className='flex flex-col sm:flex-row sm:items-center justify-between mb-4 lg:mb-8 gap-3'>
							<Skeleton className='h-7 lg:h-8 w-32 lg:w-36 rounded' />
							<Skeleton className='h-10 lg:h-12 w-full sm:w-28 rounded' />
						</div>
						<div className='mb-6 lg:mb-8 mt-8 lg:mt-16 flex gap-3 lg:gap-4'>
							{Array.from({ length: 3 }).map((_, i) => (
								<Skeleton
									key={i}
									className='h-14 w-14 lg:h-16 lg:w-16 rounded-md shrink-0'
								/>
							))}
						</div>
						<div className='space-y-3 lg:space-y-4 border-t border-neutral-light-100 pt-4 lg:pt-6'>
							{Array.from({ length: 4 }).map((_, i) => (
								<div
									key={i}
									className='flex justify-between'
								>
									<Skeleton className='h-4 lg:h-5 w-20 lg:w-24 rounded' />
									<Skeleton className='h-4 lg:h-5 w-16 lg:w-20 rounded' />
								</div>
							))}
							<div className='border-t border-neutral-light-100 pt-3 lg:pt-4'>
								<div className='flex justify-between'>
									<Skeleton className='h-5 lg:h-6 w-14 lg:w-16 rounded' />
									<Skeleton className='h-5 lg:h-6 w-20 lg:w-24 rounded' />
								</div>
							</div>
						</div>
						<Skeleton className='mt-4 lg:mt-6 h-12 w-full rounded-sm' />
						<Skeleton className='mt-6 lg:mt-8 mx-auto h-4 lg:h-5 w-36 lg:w-40 rounded' />
					</div>
				</div>
			</PageContainer>
		</>
	)
}
