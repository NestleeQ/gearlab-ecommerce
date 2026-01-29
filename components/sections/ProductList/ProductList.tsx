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
import { useEffect, useRef, useState } from 'react'

interface ProductListProps {
	popularProducts: iProduct[] | null
	newProducts: iProduct[]
}

export default function ProductList({
	popularProducts,
	newProducts
}: ProductListProps) {
	const [isVisible, setIsVisible] = useState(false)
	const sectionRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true)
				}
			},
			{ threshold: 0.1, rootMargin: '50px' }
		)

		if (sectionRef.current) {
			observer.observe(sectionRef.current)
		}

		return () => observer.disconnect()
	}, [])

	return (
		<div ref={sectionRef}>
			<PageContainer className='mt-38'>
				<Tabs
					defaultValue='featured'
					className='items-center'
				>
					<TabsList
						className={`transition-all duration-700 ease-out ${
							isVisible
								? 'opacity-100 translate-y-0'
								: 'opacity-0 translate-y-4'
						}`}
					>
						<TabsTrigger value='featured'>Featured</TabsTrigger>
						<TabsTrigger value='latest'>Latest</TabsTrigger>
					</TabsList>

					<TabsContent
						value='featured'
						className='flex mt-12 space-x-10'
					>
						{popularProducts &&
							popularProducts.map((elem, index) => {
								return (
									<div
										key={elem.id}
										className={`transition-all duration-700 ease-out ${
											isVisible
												? 'opacity-100 translate-y-0'
												: 'opacity-0 translate-y-8'
										}`}
										style={{
											transitionDelay: isVisible
												? `${index * 100}ms`
												: '0ms'
										}}
									>
										<ProductCard
											id={elem.id}
											slug={elem.slug}
											images={elem.images}
											title={elem.title}
											status={elem.status}
											price={elem.price}
											color={elem.color[0]}
											size={elem.size}
										/>
									</div>
								)
							})}
					</TabsContent>

					<TabsContent
						value='latest'
						className='flex mt-12 space-x-10'
					>
						{newProducts.map((elem, index) => {
							return (
								<div
									key={elem.id}
									className={`transition-all duration-700 ease-out ${
										isVisible
											? 'opacity-100 translate-y-0'
											: 'opacity-0 translate-y-8'
									}`}
									style={{
										transitionDelay: isVisible
											? `${index * 100}ms`
											: '0ms'
									}}
								>
									<ProductCard
										id={elem.id}
										slug={elem.slug}
										images={elem.images}
										title={elem.title}
										status={elem.status}
										price={elem.price}
										color={elem.color[0]}
										size={elem.size}
									/>
								</div>
							)
						})}
					</TabsContent>
				</Tabs>
			</PageContainer>
		</div>
	)
}
