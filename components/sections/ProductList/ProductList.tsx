'use client'
import PageContainer from '@/components/layout/PageContainer/PageContainer'
import ProductCard from '@/components/ui/ProductCard/ProductCard'
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger
} from '@/components/ui/Tabs/Tabs'
import { iProduct } from '@/services/products'

interface ProductListProps {
	popularProducts: iProduct[] | null
	newProducts: iProduct[]
}

export default function ProductList({
	popularProducts,
	newProducts
}: ProductListProps) {

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
									id={elem.id}
									slug={elem.slug}
									images={elem.images}
									title={elem.title}
									status={elem.status}
									price={elem.price}
									color={elem.color[0]}
									size={elem.size}
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
								id={elem.id}
								slug={elem.slug}
								images={elem.images}
								title={elem.title}
								status={elem.status}
								price={elem.price}
								color={elem.color[0]}
								size={elem.size}
							/>
						)
					})}
				</TabsContent>
			</Tabs>
		</PageContainer>
	)
}
