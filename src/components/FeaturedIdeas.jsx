


import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

async function getIdeas() {
  const res = await fetch("http://localhost:5000/ideas?limit=6", {
    cache: "no-store",
  });

  return res.json();
}

export default async function FeaturedIdeas() {
  const ideas = await getIdeas();

  return (

    <section className=" py-20">
  <div className="max-w-7xl mx-auto px-4">

    {/* Heading */}
    <div className="text-center mb-8">
      <button
        className="flex justify-center items-center gap-2 px-4 py-1 rounded-full
        bg-lime-300 text-lime-700 font-medium text-sm mb-4 mx-auto"
      >
        <Star className="text-red-500 text-xl" />
        Trending Now
      </button>

      <h2 className="font-bold text-gray-900 mb-3">
        <span className="text-lime-600 text-5xl">Trending</span>{" "}
        <span className="text-lime-400 text-5xl">Ideas</span>
      </h2>

      <p className="text-gray-600 max-w-2xl mx-auto text-lg">
        The most talked-about ideas in the community right now.
        Discover innovative concepts, explore fresh opportunities,
        and get inspired by what others are building.
      </p>
    </div>

   
    <div className="flex justify-end mb-8">
      <Link
        href="/ideas"
        className="group flex items-center gap-2 bg-lime-500 hover:bg-blue-600
        text-white px-6 py-3 rounded-full font-semibold shadow-lg
        transition-all duration-300"
      >
        View All Ideas
        <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
      </Link>
    </div>

    {/* Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {ideas.map((idea) => (
        <div
          key={idea._id}
          className="bg-white rounded-3xl overflow-hidden shadow-lg
          hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
        >
          <div className="relative h-52">
            <Image
              src={idea.imageURL}
              alt={idea.title}
              fill
              className="object-cover"
            />

            <div className="absolute top-4 right-4 bg-blue-500 text-white text-xs px-3 py-1 rounded-full">
              {idea.category}
            </div>
          </div>

          <div className="p-6">
            <h3 className="text-xl font-bold line-clamp-1">
              {idea.title}
            </h3>

            <p className="text-sm text-gray-500 mt-2 line-clamp-3">
              {idea.shortDescription}
            </p>

            <p className="text-green-600 mt-3 font-semibold">
              Budget: ${idea.estimatedBudget}
            </p>

            <Link
              href={`/ideas/${idea._id}`}
              className="mt-5 flex items-center justify-center gap-2
              bg-lime-500 hover:bg-lime-600 text-white py-3 rounded-xl
              transition"
            >
              View Details
              <FaArrowRight />
            </Link>
          </div>
        </div>
      ))}
    </div>

  </div>
</section>
  );
}