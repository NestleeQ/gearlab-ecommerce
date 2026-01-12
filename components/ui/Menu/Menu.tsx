'use client'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/components/ui/DropdownMenu/DropdownMenu'
import { ChevronDown, ChevronUp } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function Menu() {
	const [isOpen, setIsOpen] = useState<boolean>(false)

	return (
		<ul className='flex ml-26 space-x-8 items-baseline'>
			<li>
				<Link
					href='/'
					className='text-body text-neutral-500 font-medium'
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
						<span className='flex text-body text-neutral-500 font-medium'>
							Categories{' '}
							{isOpen ? (
								<ChevronUp className='w-5 ml-1' />
							) : (
								<ChevronDown className='w-5 ml-1' />
							)}
						</span>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem>
							<Link
								href='/'
								className='text-body text-neutral-500 font-medium'
							>
								Profile
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Link
								href='/'
								className='text-body text-neutral-500 font-medium'
							>
								Billing
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Link
								href='/'
								className='text-body text-neutral-500 font-medium'
							>
								Team
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Link
								href='/'
								className='text-body text-neutral-500 font-medium'
							>
								Subscription
							</Link>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</li>
			<li>
				<Link
					href='/about'
					className='text-body text-neutral-500 font-medium'
				>
					About
				</Link>
			</li>
			<li>
				<Link
					href='/contact'
					className='text-body text-neutral-500 font-medium'
				>
					Contact
				</Link>
			</li>
		</ul>
	)
}
