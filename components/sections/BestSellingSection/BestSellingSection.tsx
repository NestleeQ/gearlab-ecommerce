'use client'
import PageContainer from '@/components/layout/PageContainer/PageContainer'
import ProductCard from '@/components/ui/ProductCard/ProductCard'
import Title from '@/components/ui/Title/Title'
import { iProduct } from '@/services/products'
import { useEffect, useRef, useState } from 'react'

interface BestSellingSectionProps {
	bestSellers: iProduct[]
}

export default function BestSellingSection({
	bestSellers
}: BestSellingSectionProps) {
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
				<div
					className={`text-center transition-all duration-700 ease-out ${
						isVisible
							? 'opacity-100 translate-y-0'
							: 'opacity-0 translate-y-4'
					}`}
				>
					<p className='text-label text-neutral-300'>SHOP NOW</p>
					<Title>Best Selling</Title>
				</div>
				<div className='mt-20 flex space-x-10 justify-center'>
					{bestSellers.map((elem, index) => {
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
				</div>
			</PageContainer>
		</div>
	)
}
