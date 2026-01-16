import { Badge } from '@/components/ui/Badge/Badge'

export default function ProductStatus({ status }: { status: boolean }) {
	return (
		<Badge
			variant='outline'
			className='border border-neutral-200 text-neutral-900 bg-transparent py-1 px-4 pointer-events-none'
		>
			{status ? 'IN STOCK' : 'OUT OF STOCK'}
		</Badge>
	)
}
