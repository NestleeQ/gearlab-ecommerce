import { iLink } from '@/app/data/footer-links.data'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import Text from '../Text/Text'

interface iList {
	className?: string
	title: string
	links: iLink[]
}

export default function List({ className, title, links }: iList) {
	return (
		<div className={className}>
			<Text
				color={300}
				className='font-medium'
			>
				{title}
			</Text>
			<ul
				className={cn('mt-10 space-y-4', {
					'flex space-x-4': links.some(link => link.icon)
				})}
			>
				{links.map(elem => {
					return (
						<li key={elem.id}>
							<Link
								href={elem.url}
								className='text-body text-neutral-500 font-medium hover:text-neutral-300'
							>
								{elem.icon && elem.icon?.path ? (
									<Image
										src={elem.icon.path}
										alt={elem.label}
										width={elem.icon.width}
										height={elem.icon.height}
									/>
								) : (
									elem.label
								)}
							</Link>
						</li>
					)
				})}
			</ul>
		</div>
	)
}
