'use client'
import ColorSelector from '@/components/ui/ColorSelector/ColorSelector'
import { useQueryParams } from '@/hooks/useQueryParams'
import Text from '../Text/Text'

export default function ColorFilter() {
	const { params, updateQueryParams } = useQueryParams()
	const selectedColor = params.color

	return (
		<>
			<Text className='text-neutral-900 font-medium'>Color</Text>
			<div className='mt-4 w-full max-w-md'>
				<ColorSelector
					selectedColors={selectedColor}
					onColorChange={values => {
						if (values.length > 0) {
							updateQueryParams({ color: values })
						} else {
							updateQueryParams({ color: null })
						}
					}}
					multiple={true}
				/>
			</div>
		</>
	)
}
