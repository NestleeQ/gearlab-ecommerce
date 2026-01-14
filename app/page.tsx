import Header from '@/components/layout/Header/Header'
import AdvantagesSection from '@/components/sections/AdvantagesSection/AdvantagesSection'
import BannerSection from '@/components/sections/BannerSection/BannerSection'
import BestSellingSection from '@/components/sections/BestSellingSection/BestSellingSection'
import CategoriesCTA from '@/components/sections/CategoriesCTA/CategoriesCTA'
import ProductList from '@/components/sections/ProductList/ProductList'

export default function Home() {
	return (
		<div>
			<Header />
			<BannerSection />
			<AdvantagesSection />
			<BestSellingSection />
			<CategoriesCTA />
			<ProductList />
		</div>
	)
}
