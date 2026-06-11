import Banner from "@/components/Banner";
import FeaturedIdeas from "@/components/FeaturedIdeas";


export default function Home() {
  return (
    <div className="bg-purple-200">
      <Banner></Banner>
        <FeaturedIdeas></FeaturedIdeas>
    </div>
  );
}
