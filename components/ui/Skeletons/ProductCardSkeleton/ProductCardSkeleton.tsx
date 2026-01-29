import { Skeleton } from '../Skeleton/Skeleton'

export default function ProductCardSkeleton() {
	return (
		<div className='w-full max-w-63 max-h-95'>
			<Skeleton className='h-65 w-full rounded-sm' />
			<div className='mt-8'>
				<Skeleton className='h-4 w-3/4' />
				<div className='flex items-center gap-4 mt-3'>
					<Skeleton className='h-3 w-16' />
					<Skeleton className='h-4 w-20' />
				</div>
			</div>
		</div>
	)
}
