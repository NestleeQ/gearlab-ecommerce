import PageContainer from '@/components/layout/PageContainer/PageContainer'
import ProductDescription from '@/components/sections/ProductDescription/ProductDescription'
import ProductDetail from '@/components/sections/ProductDetail/ProductDetail'
import SimilarProducts from '@/components/sections/SimilarProducts/SimilarProducts'
import BreadcrumbComponent from '@/components/ui/BreadcrumbComponent/BreadcrumbComponent'
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious
} from '@/components/ui/Carousel/Carousel'
import { getProductsBySlug, iProduct } from '@/services/products'
import { getReviewsByProductId } from '@/services/reviews'
import Image from 'next/image'
import notFound from './not-found'

export default async function ProductPage({
	params
}: {
	params: Promise<{ slug: string }>
}) {
	const { slug } = await params
	const product: iProduct | null = await getProductsBySlug(slug)

	if (!product) {
		notFound()
	}

	const reviews = await getReviewsByProductId(product.id)

	return (
		<PageContainer className='relative after:absolute after:w-full after:h-px after:top-0 after:bg-neutral-light-100'>
			<div className='pt-5'>
				<BreadcrumbComponent />
				<div className='mt-4 flex items-center gap-20'>
					<Carousel
						className='w-150'
						opts={{
							loop: true
						}}
					>
						<CarouselContent>
							{product &&
								product.images.map((image, index) => {
									return (
										<CarouselItem key={index}>
											<div className='relative aspect-square overflow-hidden rounded-md bg-neutral-light-100 flex justify-center'>
												<Image
													src={image}
													alt={`${product.title} - Image ${index + 1}`}
													width={353}
													height={495}
													className='object-cover'
													priority={index === 0}
												/>
											</div>
										</CarouselItem>
									)
								})}
						</CarouselContent>
						<CarouselPrevious />
						<CarouselNext />
					</Carousel>
					{product && <ProductDetail product={product} />}
				</div>
				{product && (
					<>
						<div>
							<ProductDescription
								details={product.description}
								features={product.features}
								rating={product.rating}
								reviewCount={product.reviewCount}
								reviews={reviews}
							/>
						</div>
						<SimilarProducts product={product} />
					</>
				)}
			</div>
		</PageContainer>
	)
}
