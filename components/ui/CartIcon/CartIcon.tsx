'use client'
import { useCart } from '@/context/CartContext'
import { useMounted } from '@/hooks/useMounted'
import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

export default function CartIcon() {
	const { itemCount } = useCart()
	const mounted = useMounted()
	const [shouldPulse, setShouldPulse] = useState(false)
	const prevCountRef = useRef(itemCount)

	useEffect(() => {
		if (!mounted) return

		if (itemCount > prevCountRef.current) {
			const pulseTimer = setTimeout(() => setShouldPulse(true), 0)
			const resetTimer = setTimeout(() => setShouldPulse(false), 600)

			return () => {
				clearTimeout(pulseTimer)
				clearTimeout(resetTimer)
			}
		}

		prevCountRef.current = itemCount
	}, [itemCount, mounted])

	return (
		<Link
			href='/cart'
			className='relative text-neutral-500 hover:text-neutral-300'
			data-cart-icon
		>
			<ShoppingCart className='h-6 w-6 transition-transform' />
			{mounted && itemCount > 0 && (
				<span
					className={`absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-neutral-800 text-xs text-white transition-all duration-300 ${
						shouldPulse ? 'animate-scale-pulse' : ''
					}`}
					aria-hidden='true'
				>
					{itemCount > 99 ? '99+' : itemCount}
				</span>
			)}
		</Link>
	)
}
