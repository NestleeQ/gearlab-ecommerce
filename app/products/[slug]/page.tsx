import PageContainer from '@/components/layout/PageContainer/PageContainer'
import BreadcrumbComponent from '@/components/ui/BreadcrumbComponent/BreadcrumbComponent'

export default async function ProductPage({
	params
}: {
	params: Promise<{ slug: string }>
}) {
	const { slug } = await params

	return (
		<PageContainer className='relative after:absolute after:w-full after:h-px after:top-0 after:bg-neutral-light-100'>
			<div className='pt-5'>
				<BreadcrumbComponent />
				<div>{/* <Image/> */}</div>
			</div>
		</PageContainer>
	)
}
