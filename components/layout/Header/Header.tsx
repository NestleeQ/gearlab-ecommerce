import Logo from '@/components/ui/Logo/Logo'
import Menu from '@/components/ui/Menu/Menu'
import Search from '@/components/ui/Search/Search'
import { ShoppingCart, User } from 'lucide-react'
import Link from 'next/link'

export default function Header() {
	return (
		<header className='container mx-auto min-h-21 flex justify-between items-center'>
			<Logo />
			<Menu />
			<div className='flex items-center'>
				<Search />
				<div className='flex items-center ml-8 space-x-6'>
					<Link href='/cart'>
						<ShoppingCart className='text-neutral-500 hover:text-neutral-300' />
					</Link>
					<Link href='/profile'>
						<User className='text-neutral-500 hover:text-neutral-300' />
					</Link>
				</div>
			</div>
		</header>
	)
}
