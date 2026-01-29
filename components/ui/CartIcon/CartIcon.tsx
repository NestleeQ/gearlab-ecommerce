'use client'
import { useCart } from '@/context/CartContext'
import { useMounted } from '@/hooks/useMounted'
import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'

export default function CartIcon() {
	const { itemCount } = useCart()
	const mounted = useMounted()

	return (
		<Link
			href='/cart'
			className='relative text-neutral-500 hover:text-neutral-300'
		>
			<ShoppingCart className='h-6 w-6' />
			{mounted && itemCount > 0 && (
				<span className='absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-neutral-800 text-label text-white'>
					{itemCount}
				</span>
			)}
		</Link>
	)
}
