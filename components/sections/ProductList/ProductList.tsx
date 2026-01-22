'use client'
import PageContainer from '@/components/layout/PageContainer/PageContainer'
import ProductCard from '@/components/ui/ProductCard/ProductCard'
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger
} from '@/components/ui/Tabs/Tabs'
import {
	getNewProducts,
	getPopularProducts,
	iProduct
} from '@/services/products'
import { useEffect, useState } from 'react'

export default function ProductList() {
	const [popularProducts, setPopularProducts] = useState<iProduct[] | null>(
		[]
	)
	const [newProducts, setNewProducts] = useState<iProduct[]>([])

	useEffect(() => {
		getPopularProducts(4).then(setPopularProducts)
		getNewProducts(4).then(setNewProducts)
	}, [])

	return (
		<PageContainer className='mt-38'>
			<Tabs
				defaultValue='featured'
				className='items-center'
			>
				<TabsList>
					<TabsTrigger value='featured'>Featured</TabsTrigger>
					<TabsTrigger value='latest'>Latest</TabsTrigger>
				</TabsList>
				<TabsContent
					value='featured'
					className='flex mt-12 space-x-10'
				>
					{popularProducts &&
						popularProducts.map(elem => {
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
				</TabsContent>
				<TabsContent
					value='latest'
					className='flex mt-12 space-x-10'
				>
					{newProducts.map(elem => {
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
				</TabsContent>
			</Tabs>
		</PageContainer>
	)
}
