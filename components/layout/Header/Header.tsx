'use client'
import CartIcon from '@/components/ui/CartIcon/CartIcon'
import Logo from '@/components/ui/Logo/Logo'
import Menu from '@/components/ui/Menu/Menu'
import { useAuth } from '@/context/AuthContext'
import { ICategory } from '@/services/filters'
import { User } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface IHeader {
	categories: ICategory[]
}

export default function Header({ categories }: IHeader) {
	const router = useRouter()
	const { isAuthenticated, user } = useAuth()

	const handleUserIconClick = (e: React.MouseEvent) => {
		e.preventDefault()

		if (isAuthenticated) {
			router.push('/profile')
		} else {
			router.push('/login')
		}
	}

	return (
		<header className='container-custom min-h-21 flex justify-between items-center'>
			<Logo />
			<Menu categories={categories} />
			<div className='flex items-center'>
				<div className='flex items-center ml-8 space-x-6'>
					<CartIcon />
					<button
						onClick={handleUserIconClick}
						className='cursor-pointer relative p-2 rounded-full transition-colors'
						aria-label={
							isAuthenticated ? 'Go to profile' : 'Sign in'
						}
						title={
							isAuthenticated
								? `Logged in as ${user?.name}`
								: 'Sign in'
						}
					>
						<User className='text-neutral-500 hover:text-neutral-900' />
						{isAuthenticated && (
							<span className='absolute top-1 right-1 h-2 w-2 bg-green-500 rounded-full'></span>
						)}
					</button>
				</div>
			</div>
		</header>
	)
}
