'use client'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/components/ui/DropdownMenu/DropdownMenu'
import { ICategory } from '@/services/filters'
import { ChevronDown, ChevronUp } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

interface IMenu {
	categories: ICategory[]
}

export default function Menu({ categories = [] }: IMenu) {
	const [isOpen, setIsOpen] = useState<boolean>(false)

	const capitalizeFirstLetter = (str: string) => {
		if (!str) return ''
		return str.charAt(0).toUpperCase() + str.slice(1)
	}

	return (
		<ul className='flex space-x-8 items-baseline'>
			<li>
				<Link
					href='/'
					className='text-body text-neutral-500 font-medium hover:text-neutral-300'
				>
					Home
				</Link>
			</li>
			<li>
				<DropdownMenu
					onOpenChange={() => setIsOpen(!isOpen)}
					modal={false}
				>
					<DropdownMenuTrigger className='cursor-pointer'>
						<span className='flex text-body text-neutral-500 font-medium hover:text-neutral-300'>
							Categories{' '}
							{isOpen ? (
								<ChevronUp className='w-5 ml-1' />
							) : (
								<ChevronDown className='w-5 ml-1' />
							)}
						</span>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						{categories.map(elem => {
							return (
								<DropdownMenuItem key={elem.name}>
									<Link
										href={`/products?category=${elem.name.toLowerCase()}`}
										className='text-body text-neutral-500 font-medium hover:text-neutral-300'
									>
										{capitalizeFirstLetter(elem.name)}
									</Link>
								</DropdownMenuItem>
							)
						})}
					</DropdownMenuContent>
				</DropdownMenu>
			</li>
			<li>
				<Link
					href='/about'
					className='text-body text-neutral-500 font-medium hover:text-neutral-300'
				>
					About
				</Link>
			</li>
			<li>
				<Link
					href='/contacts'
					className='text-body text-neutral-500 font-medium hover:text-neutral-300'
				>
					Contact
				</Link>
			</li>
		</ul>
	)
}
