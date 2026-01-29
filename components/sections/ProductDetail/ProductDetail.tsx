'use client'
import { useAuth } from '@/context/AuthContext'
import { useWishlist } from '@/context/WishListContext'
import { useAddToCart } from '@/hooks/useAddToCart'
import { useMounted } from '@/hooks/useMounted'
import { cn, formatPrice } from '@/lib/utils'
import { iProduct, Size } from '@/services/products'
import { Heart, Star } from 'lucide-react'
import { useState } from 'react'
import { Badge } from '../../ui/Badge/Badge'
import { Button } from '../../ui/Button/Button'
import ProductColorSelector from '../../ui/ProductColorSelector/ProductColorSelector'
import ProductSizeSelector from '../../ui/ProductSizeSelector/ProductSizeSelector'
import ProductStatus from '../../ui/ProductStatus/ProductStatus'
import QuantityInput from '../../ui/QuantityInput/QuantityInput'
import Text from '../../ui/Text/Text'
import Title from '../../ui/Title/Title'

export default function ProductDetail({ product }: { product: iProduct }) {
	const [quantity, setQuantity] = useState<number>(1)
	const [selectedColor, setSelectedColor] = useState<string>(product.color[0])
	const [selectedSize, setSelectedSize] = useState<Size>(product.size[0])
	const { handleAddToCart } = useAddToCart()

	const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
	const { isAuthenticated } = useAuth()
	const mounted = useMounted()

	const inWishlist = mounted && isInWishlist(product.id)

	const onAddToCart = () => {
		handleAddToCart({
			id: product.id,
			slug: product.slug,
			title: product.title,
			price: product.price,
			image: product.images[0],
			color: selectedColor,
			size: selectedSize,
			quantity: quantity
		})
	}

	const handleWishlistClick = () => {
		if (!isAuthenticated) {
			return
		}

		if (inWishlist) {
			removeFromWishlist(product.id)
		} else {
			addToWishlist({
				id: product.id,
				slug: product.slug,
				title: product.title,
				price: product.price,
				image: product.images[0]
			})
		}
	}

	return (
		<div>
			<Title>{product.title}</Title>
			<div className='flex mt-3 gap-3 items-center'>
				<Badge variant='secondary'>
					<Star className='fill-neutral-500' />{' '}
					<span className='ml-1'>
						{product.rating} — {product.reviewCount} Reviews
					</span>
				</Badge>
				<ProductStatus status={product.status} />
			</div>
			<h4 className='mt-6 text-lg text-neutral-900 font-semibold'>
				{formatPrice(product.price)}
			</h4>
			<div className='mt-8'>
				<Text className='mb-2.5'>Available Colors</Text>
				<ProductColorSelector
					availableColors={product.color}
					onColorSelect={setSelectedColor}
					defaultColor={selectedColor}
				/>
			</div>
			<div className='mt-4'>
				<Text className='mb-2.5'>Select Size</Text>
				<ProductSizeSelector
					availableSizes={product.size}
					onSizeSelect={setSelectedSize}
					defaultSize={selectedSize}
				/>
			</div>
			<div className='mt-8'>
				<Text className='mb-2.5'>Quantity</Text>
				<QuantityInput
					value={quantity}
					min={1}
					max={100}
					onChange={setQuantity}
				/>
			</div>
			<div className='mt-10'>
				<div className='flex items-center space-x-4'>
					<Button
						size='lg'
						className='px-25 rounded-sm'
						onClick={onAddToCart}
					>
						Add to cart
					</Button>
					{mounted && (
						<Button
							variant='outline'
							size='icon-lg'
							onClick={handleWishlistClick}
							disabled={!isAuthenticated}
							title={
								!isAuthenticated
									? 'Sign in to add to wishlist'
									: inWishlist
										? 'Remove from wishlist'
										: 'Add to wishlist'
							}
						>
							<Heart
								className={cn(
									'size-5',
									inWishlist
										? 'fill-red-500 stroke-red-500'
										: 'stroke-neutral-500'
								)}
							/>
						</Button>
					)}
				</div>
				<Text className='mt-3'>— Free shipping on orders $100+</Text>
			</div>
		</div>
	)
}
