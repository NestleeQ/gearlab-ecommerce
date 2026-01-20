'use client'
import PageContainer from '@/components/layout/PageContainer/PageContainer'
import ProductCard from '@/components/ui/ProductCard/ProductCard'
import Title from '@/components/ui/Title/Title'
import { getBestSellers, iProduct } from '@/services/products'
import { useEffect, useState } from 'react'

export default function BestSellingSection() {
	const [bestSellers, setBestSellers] = useState<iProduct[]>([])

	useEffect(() => {
		getBestSellers(4).then(setBestSellers)
	}, [])

	return (
		<PageContainer className='mt-42'>
			<div className='text-center'>
				<p className='text-label text-neutral-300'>SHOP NOW</p>
				<Title>Best Selling</Title>
			</div>
			<div className='flex justify-center items-center mt-20 space-x-8'>
				{bestSellers &&
					bestSellers.map(elem => {
						return (
							<ProductCard
								key={elem.id}
								slug={elem.slug}
								images={elem.images}
								title={elem.title}
								status={elem.status}
								price={elem.price}
							/>
						)
					})}
			</div>
		</PageContainer>
	)
}
