'use client'
import PageContainer from '@/components/layout/PageContainer/PageContainer'
import { Button } from '@/components/ui/Button/Button'
import Text from '@/components/ui/Text/Text'
import Title from '@/components/ui/Title/Title'
import { MoveRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function NotFound() {
	const router = useRouter()
	return (
		<PageContainer className='mt-30 text-center'>
			<Title>Not Found</Title>
			<Text>Could not find requested resource</Text>
			<Button
				variant='default'
				size='lg'
				className='mt-5 font-medium rounded-sm'
				onClick={() => router.push('/')}
			>
				Return to Home {''} <MoveRight />
			</Button>
		</PageContainer>
	)
}
