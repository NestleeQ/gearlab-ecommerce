'use client'
import PageContainer from '@/components/layout/PageContainer/PageContainer'
import PageTitleWide from '@/components/ui/PageTitleWide/PageTitleWide'
import ProfileSidebar from '@/components/ui/ProfileSidebar/ProfileSidebar'
import { useAuth } from '@/context/AuthContext'
import { useMounted } from '@/hooks/useMounted'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function ProfileLayout({
	children
}: {
	children: React.ReactNode
}) {
	const { isAuthenticated, isLoading } = useAuth()
	const router = useRouter()
	const mounted = useMounted()

	useEffect(() => {
		if (mounted && !isLoading && !isAuthenticated) {
			router.push('/login')
		}
	}, [isAuthenticated, isLoading, router, mounted])

	if (!mounted || isLoading) {
		return (
			<>
				<PageTitleWide title='My Account' />
				<PageContainer className='mt-16'>
					<div className='flex min-h-[60vh] items-center justify-center'>
						<div className='text-neutral-600'>Loading...</div>
					</div>
				</PageContainer>
			</>
		)
	}

	if (!isAuthenticated) {
		return null
	}

	return (
		<>
			<PageTitleWide title='My Account' />
			<PageContainer className='mt-16'>
				<div className='flex gap-8'>
					<ProfileSidebar />
					<main className='flex-1'>{children}</main>
				</div>
			</PageContainer>
		</>
	)
}
