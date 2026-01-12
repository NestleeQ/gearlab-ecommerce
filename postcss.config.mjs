const config = {
	plugins: {
		'@tailwindcss/postcss': {}
	},
	theme: {
		extend: {
			container: {
				center: true,
				screen: {
					sm: '100%',
					md: '100%',
					lg: '1116px',
					xl: '1116px'
				}
			}
		}
	}
}

export default config
