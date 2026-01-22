'use client'
import PageContainer from '@/components/layout/PageContainer/PageContainer'
import ProductCard from '@/components/ui/ProductCard/ProductCard'
import Title from '@/components/ui/Title/Title'
import { getSimilarProducts, iProduct } from '@/services/products'
import { useEffect, useState } from 'react'

export default function SimilarProducts({ product }: { product: iProduct }) {
	const [similarProducts, setSimilarProducts] = useState<iProduct[]>([])

	useEffect(() => {
		getSimilarProducts(product, 4).then(setSimilarProducts)
	}, [product])

	return (
		<PageContainer className='mt-42'>
			<div className='text-center'>
				<Title>You might also like</Title>
				<p className='text-label text-neutral-300'>SIMILAR PRODUCTS</p>
			</div>
			<div className='flex justify-center items-center mt-20 space-x-10'>
				{similarProducts &&
					similarProducts.map(elem => {
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
