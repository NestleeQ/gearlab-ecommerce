'use client'

import { useCart } from '@/context/CartContext'
import { CartItem } from '@/types/cart'
import { useCallback } from 'react'
import { toast } from 'sonner'

export function useAddToCart() {
	const { addToCart } = useCart()

	const handleAddToCart = useCallback(
		(item: CartItem) => {
			addToCart(item)

			const cartIcon = document.querySelector('[data-cart-icon]')
			if (cartIcon) {
				cartIcon.classList.add('animate-bounce-once')
				setTimeout(() => {
					cartIcon.classList.remove('animate-bounce-once')
				}, 600)
			}

			toast.success('Added to cart', {
				description: `${item.title} has been added to your cart.`
			})
		},
		[addToCart]
	)

	return { handleAddToCart }
}
