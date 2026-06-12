import Banner from "@/components/Banner";
import FeaturedIdeas from "@/components/FeaturedIdeas";
import StartupCategories from "@/components/StartupCategories";
import WhyChooseIdeaVault from "@/components/WhyChooseIdeaVault";


export default function Home() {
  return (
    <div className="bg-gradient-to-b from-lime-50 via-white to-green-50">
      <Banner></Banner>
        <FeaturedIdeas></FeaturedIdeas>
        <WhyChooseIdeaVault></WhyChooseIdeaVault>
        <StartupCategories></StartupCategories>
    </div>
  );
}
