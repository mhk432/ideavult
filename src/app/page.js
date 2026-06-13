import Banner from "@/components/Banner";
import FeaturedIdeas from "@/components/FeaturedIdeas";
import StartupCategories from "@/components/StartupCategories";
import WhyChooseIdeaVault from "@/components/WhyChooseIdeaVault";


export default function Home() {
  return (
    <div className="" >
      <Banner></Banner>
        <FeaturedIdeas></FeaturedIdeas>
        <WhyChooseIdeaVault></WhyChooseIdeaVault>
        <StartupCategories></StartupCategories>
    </div>
  );
}
