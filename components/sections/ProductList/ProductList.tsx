import { productsFeatured } from '@/app/data/products.data'
import PageContainer from '@/components/layout/PageContainer/PageContainer'
import ProductCard from '@/components/ui/ProductCard/ProductCard'
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger
} from '@/components/ui/Tabs/Tabs'

export default function ProductList() {
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
					className='flex mt-12 space-x-8'
				>
					{productsFeatured.map(elem => {
						return (
							<ProductCard
								key={elem.id}
								id={elem.id}
								slug={elem.slug}
								imagePath={elem.imagePath}
								title={elem.title}
								status={elem.status}
								price={elem.price}
							/>
						)
					})}
				</TabsContent>
				<TabsContent
					value='latest'
					className='flex mt-12 space-x-8'
				>
					{productsFeatured.map(elem => {
						return (
							<ProductCard
								key={elem.id}
								id={elem.id}
								slug={elem.slug}
								imagePath={elem.imagePath}
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
