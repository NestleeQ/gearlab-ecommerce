import PageContainer from '@/components/layout/PageContainer/PageContainer'
import { Package } from 'lucide-react'
import Link from 'next/link'
import { Button } from '../Button/Button'
import PageTitleWide from '../PageTitleWide/PageTitleWide'

export default function ThankYouScreen() {
	return (
		<>
			<PageTitleWide
				title='Cart'
				isPrimary={true}
			/>
			<PageContainer>
				<div className='flex min-h-[60vh] flex-col items-center justify-center'>
					<div className='mb-6 flex h-26 w-26 items-center justify-center rounded-full bg-neutral-100'>
						<Package
							className='h-15 w-15 text-neutral-900'
							strokeWidth={1}
						/>
					</div>
					<h1 className='mb-3 text-heading-h3 font-bold text-neutral-900'>
						Thank you for shopping
					</h1>
					<p className='mb-8 max-w-80 text-center text-body text-neutral-500'>
						Your order has been successfully placed and is now being
						processed.
					</p>
					<div className='flex gap-4'>
						<Link href='/products'>
							<Button
								className='min-w-48 rounded-sm'
								size='lg'
							>
								Go to catalog
								<span>→</span>
							</Button>
						</Link>
						<Link href='/profile/orders'>
							<Button
								className='min-w-48 rounded-sm'
								size='lg'
							>
								View Orders
							</Button>
						</Link>
					</div>
				</div>
			</PageContainer>
		</>
	)
}
