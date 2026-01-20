'use client'
import PageContainer from '@/components/layout/PageContainer/PageContainer'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Fragment } from 'react/jsx-runtime'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator
} from '../Breadcrumb/Breadcrumb'

export default function BreadcrumbComponent() {
	const paths = usePathname()
	const pathNames = paths.split('/').filter(path => path)

	const getPath = (index: number) => {
		return '/' + pathNames.slice(0, index + 1).join('/')
	}

	const formatName = (path: string) => {
		const withSpaces = path.replace(/-/g, ' ')
		return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1)
	}

	return (
		<PageContainer>
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink asChild>
							<Link href='/'>Home</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
					{pathNames.length > 0 && <BreadcrumbSeparator />}
					{pathNames.map((path, idx) => {
						const isLast = idx === pathNames.length - 1
						const href = getPath(idx)
						const displayName = formatName(path)

						return (
							<Fragment key={`${path}-${idx}`}>
								<BreadcrumbItem>
									{isLast ? (
										<BreadcrumbPage className='text-neutral-900 font-medium'>
											{displayName}
										</BreadcrumbPage>
									) : (
										<BreadcrumbLink asChild>
											<Link href={href}>
												{displayName}
											</Link>
										</BreadcrumbLink>
									)}
								</BreadcrumbItem>
								{!isLast && <BreadcrumbSeparator />}
							</Fragment>
						)
					})}
				</BreadcrumbList>
			</Breadcrumb>
		</PageContainer>
	)
}
