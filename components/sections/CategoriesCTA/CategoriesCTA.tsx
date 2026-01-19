'use client'
import PageContainer from '@/components/layout/PageContainer/PageContainer'
import { Button } from '@/components/ui/Button/Button'
import Text from '@/components/ui/Text/Text'
import Title from '@/components/ui/Title/Title'
import { MoveRight } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function CategoriesCTA() {
	const router = useRouter()
	return (
		<div className='min-h-76 mt-42 bg-linear-to-r from-neutral-light-100 to-neutral-light-900'>
			<PageContainer className='mt-13 flex justify-between items-center'>
				<div>
					<Title className='font-bold'>
						Browse Our Fashion Paradise!
					</Title>
					<Text
						className='mt-6 max-w-115'
						color={500}
					>
						Step into a world of style and explore our diverse
						collection of clothing categories.
					</Text>
					<Button
						variant='default'
						size='lg'
						className='mt-8 font-medium rounded-sm'
						onClick={() => router.push('/products')}
					>
						Start Browsing {''} <MoveRight />
					</Button>
				</div>
				<Image
					src='/images/categories-cta/categories-cta-back.png'
					alt='categories-cta'
					width={225}
					height={311}
					preload={true}
				/>
			</PageContainer>
		</div>
	)
}
