export default function CatalogSkeleton() {
	return (
		<div className='animate-pulse'>
			<div className='flex justify-between items-center mb-6'>
				<div className='h-5 w-48 bg-neutral-100 rounded'></div>
				<div className='h-7 w-40 bg-neutral-100 rounded'></div>
			</div>
			<div className='flex flex-wrap gap-4.5 space-y-8'>
				{Array.from({ length: 5 }).map((_, i) => (
					<div
						key={i}
						className='w-59 h-84 bg-neutral-100 rounded'
					></div>
				))}
			</div>
		</div>
	)
}
