'use client'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface AuthRedirectProps {
	children: React.ReactNode
	redirectTo?: string
}

export default function AuthRedirect({
	children,
	redirectTo = '/'
}: AuthRedirectProps) {
	const { isAuthenticated, isLoading } = useAuth()
	const router = useRouter()

	useEffect(() => {
		if (!isLoading && isAuthenticated) {
			router.replace(redirectTo)
		}
	}, [isAuthenticated, isLoading, router, redirectTo])

	if (isLoading || isAuthenticated) {
		return null
	}

	return <>{children}</>
}
