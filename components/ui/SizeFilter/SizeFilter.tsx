import { useQueryParams } from '@/hooks/useQueryParams'
import SizeSelector from '../SizeSelector/SizeSelector'
import Text from '../Text/Text'

export default function SizeFilter() {
	const { params, updateQueryParams } = useQueryParams()
	const selectedSizes = params.size

	return (
		<>
			<Text className='text-neutral-900 font-medium'>Size</Text>
			<div className='mt-4 w-full max-w-md'>
				<SizeSelector
					selectedSizes={selectedSizes}
					onSizeChange={values => {
						if (values.length > 0) {
							updateQueryParams({ size: values })
						} else {
							updateQueryParams({ size: null })
						}
					}}
					multiple={true}
				/>
			</div>
		</>
	)
}
