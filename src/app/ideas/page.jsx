'use client'

import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import { useEffect, useState } from "react";

const IdeasPage = () => {
  const [ideas, setIdeas] = useState([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // 🔥 FETCH FUNCTION
  const fetchIdeas = async () => {
    try {
      const params = new URLSearchParams();

      if (search) params.append("search", search);
      if (category) params.append("category", category);
      if (startDate) params.append("startDate", startDate);
      if (endDate) params.append("endDate", endDate);

      const res = await fetch(
        `http://localhost:5000/ideas?${params.toString()}`
      );

      const data = await res.json();
      setIdeas(data);
    } catch (err) {
      console.log(err);
    }
  };

  // auto fetch on change
  useEffect(() => {
    fetchIdeas();
  }, [search, category, startDate, endDate]);

  return (
    <div className="mt-20 mx-20">

      <h1 className="text-4xl font-bold mb-6">
        All Ideas
      </h1>

      {/* 🔍 FILTER SECTION */}
      <div className="flex flex-col items-center justify-center text-center mb-10 bg-gray-200 p-6 rounded-xl">

  {/* Heading */}
  <h2 className="text-5xl font-bold mb-2 text-lime-800">Discover Ideas</h2>
  <p className="text-gray-600 mb-6">
    Browse groundbreaking startup ideas from the community. Find your next big opportunity.
  </p>

  {/* Search + Select */}
  <div className="flex flex-col md:flex-row items-center gap-4 w-full justify-center">
    
    <input
      type="text"
      placeholder=" 🔍 Search ideas by title..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="border p-3 rounded-full w-full md:w-1/2 bg-gray-300 px-6 focus:outline-none focus:ring-2 focus:ring-lime-400"
    />





<select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="  bg-lime-100 border border-lime-100 p-4 rounded w-2/12"
        >
          <option value="">All Category</option>
          <option value="Tech">Tech</option>
          <option value="AI">AI</option>
          <option value="Health">Health</option>
          <option value="Business">Business</option>
          <option value="Education">Education</option>
        </select>

  </div>

  {/* Category chips */}
  <div className="flex flex-wrap justify-center gap-2 mt-6">
  {[
    "All",
    "Health",
    "Tech",
    "EdTech",
    "Business",
    "Education",
  ].map((item) => {
    const isActive =
      (item === "All" && category === "") || category === item;

    return (
      <button
        key={item}
        onClick={() => setCategory(item === "All" ? "" : item)}
        className={`px-4 py-2 rounded-full border transition font-medium
          ${
            isActive
              ? "bg-lime-500 text-white border-lime-200 shadow-md"
              : "bg-white hover:bg-lime-200"
          }
        `}
      >
        {item}
      </button>
    );
  })}
</div>

</div>

      {/* CARDS */}
      <div className="grid grid-cols-3 gap-8 bg-gray-200 p-8">

        {ideas.length === 0 ? (
          <p className="text-center col-span-3 text-gray-500">
            No ideas found
          </p>
        ) : (
          ideas.map((idea) => (
            <div
              key={idea._id}
              className="bg-white rounded-3xl overflow-hidden shadow-lg"
            >
              {/* IMAGE */}
              <div className="relative h-52">
                <Image
                  src={idea.imageURL}
                  alt={idea.title}
                  fill
                  className="object-cover"
                />

                <div className="absolute top-4 right-4 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                  {idea.category}
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-6 m-2">

                <h3 className="text-xl font-bold">
                  {idea.title}
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  {idea.shortDescription}
                </p>

                <p className="text-green-600 mt-2 font-semibold">
                  Budget:${idea.estimatedBudget}
                </p>
               <div className="flex flex-wrap gap-2 mb-8">
                {idea.tags?.map((tag, index) => (
                    <span
                        key={index}
                        className="bg-lime-200 text-green-700 px-4 py-1.5 rounded-full text-sm"
                    >
                        #{tag.toLowerCase()}
                    </span>
                ))}
            </div>

                <Link
                  href={`/ideas/${idea._id}`}
                  className="mt-4 flex items-center justify-center gap-2 bg-lime-500 text-white py-2 rounded-xl"
                >
                  View Details <FaArrowRight />
                </Link>

              </div>
            </div>
          ))
        )}

      </div>
    </div>
  );
};

export default IdeasPage;