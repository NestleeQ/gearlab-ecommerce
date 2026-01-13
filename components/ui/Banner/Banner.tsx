import { Button } from '@/components/ui/Button/Button'
import { MoveRight } from 'lucide-react'
import Image from 'next/image'

export default function Banner() {
	return (
		<section className='relative bg-neutral-light-100 min-h-110 flex items-center'>
			<div className='container mx-auto flex justify-between mt-23'>
				<div>
					<h2 className='text-heading-h2 font-semibold text-neutral-800'>
						Fresh Arrivals Online
					</h2>
					<p className='text-body text-neutral-600 mt-3'>
						Discover Our Newest Collection Today.
					</p>
					<Button
						variant='default'
						size='lg'
						className='mt-12'
					>
						View Collection {''} <MoveRight />
					</Button>
				</div>
				<div>
					<svg
						width='340'
						height='340'
						viewBox='0 0 340 340'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
						className='mr-5'
					>
						<circle
							opacity='0.6'
							cx='170'
							cy='170'
							r='170'
							className='fill-neutral-light-200'
						/>
						<path
							d='M46 21.9687C38.5464 22.6337 34.2639 23.2456 31.6348 25.2672C28.5449 27.6348 27.8131 31.9707 27 40.6427C26.1598 31.6515 25.4009 27.3421 22.0128 25.0278C19.3837 23.219 15.1284 22.6337 8 21.9953C15.4265 21.3303 19.7361 20.7184 22.3381 18.7234C25.4551 16.3293 26.1869 12.0199 27 3.32129C27.7589 11.3282 28.4365 15.611 30.9572 18.0849C33.4779 20.5588 37.8688 21.2505 46 21.9687Z'
							className='fill-neutral-100'
						/>
					</svg>
					<Image
						src='/images/hero/model_back.png'
						alt='hero_banner'
						className='absolute bottom-0 right-52'
						width={255}
						height={382}
						preload={true}
					/>
				</div>
			</div>
		</section>
	)
}
