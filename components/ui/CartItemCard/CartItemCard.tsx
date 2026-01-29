import { useCart } from '@/context/CartContext'
import { colorMap } from '@/lib/color-map'
import { cn, formatPrice } from '@/lib/utils'
import { CartItem } from '@/types/cart'
import { X } from 'lucide-react'
import Image from 'next/image'
import { Button } from '../Button/Button'
import QuantityInput from '../QuantityInput/QuantityInput'
import Text from '../Text/Text'

interface iCartItemCard {
	item: CartItem
}

export default function CartItemCard({ item }: iCartItemCard) {
	const { updateQuantity, removeFromCart } = useCart()
	const handleQuantityChange = (newQuantity: number) => {
		updateQuantity(item.id, item.size, item.color, newQuantity)
	}

	return (
		<div className='flex gap-4 border-b border-neutral-light-100 pb-6'>
			<div className='relative h-24 w-24 shrink-0 overflow-hidden rounded-md bg-neutral-light-100 flex justify-center'>
				<Image
					src={item.image}
					alt={item.title}
					fill={true}
					sizes='96px'
					className='object-cover'
					quality={80}
				/>
			</div>
			<div className='flex flex-1 flex-col justify-between'>
				<div className='flex justify-between'>
					<div>
						<h3 className='text-body font-medium text-neutral-900'>
							{item.title}
						</h3>
						<div className='mt-1 flex items-center gap-2 text-body text-neutral-500'>
							<span className='flex items-center gap-1.5'>
								Color:{' '}
								<span
									className={cn(
										'h-4 w-4 rounded-full border border-neutral-200',
										colorMap[item.color] || 'bg-neutral-200'
									)}
								/>
								{item.color}
							</span>
							{'—'}
							<Text>Size: {item.size}</Text>
						</div>
					</div>
					<Text className='text-heading-h4 font-semibold text-neutral-900'>
						{formatPrice(item.price)}
					</Text>
				</div>
				<div className='flex items-center justify-between'>
					<QuantityInput
						value={item.quantity}
						min={1}
						max={100}
						onChange={handleQuantityChange}
					/>
					<Button
						variant='ghost'
						size='icon-sm'
						onClick={() =>
							removeFromCart(item.id, item.size, item.color)
						}
					>
						<X className='h-7 w-7' />
					</Button>
				</div>
			</div>
		</div>
	)
}
