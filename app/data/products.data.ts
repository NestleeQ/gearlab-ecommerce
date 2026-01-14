interface iProducts {
	id: number
	imagePath: string
	title: string
	status: boolean
	price: number
}

export const productsBestSelling: iProducts[] = [
	{
		id: 0,
		imagePath: '/images/products/best_selling/cover_1.png',
		title: 'Classic Monochrome Tees',
		status: true,
		price: 3500
	},
	{
		id: 1,
		imagePath: '/images/products/best_selling/cover_2.png',
		title: 'Monochromatic Wardrobe',
		status: true,
		price: 2700
	},
	{
		id: 2,
		imagePath: '/images/products/best_selling/cover_3.png',
		title: 'Essential Neutrals',
		status: true,
		price: 2200
	},
	{
		id: 3,
		imagePath: '/images/products/best_selling/cover_4.png',
		title: 'UTRAANET Black',
		status: true,
		price: 4300
	}
]

export const productsFeatured: iProducts[] = [
	{
		id: 0,
		imagePath: '/images/products/featured/cover_1.png',
		title: 'Elegant Ebony Sweatshirts',
		status: true,
		price: 3500
	},
	{
		id: 1,
		imagePath: '/images/products/featured/cover_2.png',
		title: 'Sleek and Cozy Black',
		status: true,
		price: 5700
	},
	{
		id: 2,
		imagePath: '/images/products/featured/cover_3.png',
		title: 'Raw Black Tees',
		status: true,
		price: 1900
	},
	{
		id: 3,
		imagePath: '/images/products/featured/cover_4.png',
		title: 'MOCKUP Black',
		status: true,
		price: 3000
	}
]

export const productsLatest: iProducts[] = [
	{
		id: 0,
		imagePath: '/images/products/featured/cover_1.png',
		title: 'Elegant Ebony Sweatshirts',
		status: true,
		price: 3500
	},
	{
		id: 1,
		imagePath: '/images/products/featured/cover_2.png',
		title: 'Sleek and Cozy Black',
		status: true,
		price: 5700
	},
	{
		id: 2,
		imagePath: '/images/products/featured/cover_3.png',
		title: 'Raw Black Tees',
		status: true,
		price: 1900
	},
	{
		id: 3,
		imagePath: '/images/products/featured/cover_4.png',
		title: 'MOCKUP Black',
		status: true,
		price: 3000
	}
]
