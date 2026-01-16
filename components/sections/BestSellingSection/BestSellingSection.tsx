import { productsBestSelling } from '@/app/data/products.data'
import PageContainer from '@/components/layout/PageContainer/PageContainer'
import ProductCard from '@/components/ui/ProductCard/ProductCard'
import Title from '@/components/ui/Title/Title'

export default function BestSellingSection() {
	return (
		<PageContainer className='mt-42'>
			<div className='text-center'>
				<p className='text-label text-neutral-300'>SHOP NOW</p>
				<Title>Best Selling</Title>
			</div>
			<div className='flex justify-center items-center mt-20 space-x-8'>
				{productsBestSelling.map(elem => {
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
			</div>
		</PageContainer>
	)
}
