
 "use client"

import CountUp from "react-countup";
import {
  FaRobot,
  FaHeartbeat,
  FaGraduationCap,
  FaMoneyBillWave,
  FaShoppingCart,
  FaLaptopCode,
} from "react-icons/fa";

export default function StartupCategories() {
  const categories = [
    {
      name: "AI & Automation",
      icon: <FaRobot />,
      ideas: "120+ Ideas",
      desc: "Smart solutions powered by artificial intelligence.",
    },
    {
      name: "HealthTech",
      icon: <FaHeartbeat />,
      ideas: "85+ Ideas",
      desc: "Improving healthcare through innovation.",
    },
    {
      name: "EdTech",
      icon: <FaGraduationCap />,
      ideas: "95+ Ideas",
      desc: "Transforming education with technology.",
    },
    {
      name: "FinTech",
      icon: <FaMoneyBillWave />,
      ideas: "110+ Ideas",
      desc: "Modern financial products and services.",
    },
    {
      name: "E-Commerce",
      icon: <FaShoppingCart />,
      ideas: "140+ Ideas",
      desc: "Online business and marketplace solutions.",
    },
    {
      name: "Technology",
      icon: <FaLaptopCode />,
      ideas: "170+ Ideas",
      desc: "Next-generation digital products.",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-l from-white to-green-50">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="bg-green-100 text-green-700 px-5 py-2 rounded-full text-sm font-medium">
            Explore Innovation
          </span>

          <h2 className="text-4xl md:text-5xl font-bold mt-6 text-gray-900">
            Startup Categories
          </h2>

          <p className="text-gray-600 mt-4 max-w-3xl mx-auto">
            Discover groundbreaking startup ideas across multiple industries.
            Explore opportunities, validate concepts, and connect with
            innovators worldwide.
          </p>
        </div>

        {/* Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <div
              key={index}
              className="group bg-white rounded-3xl p-8 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="w-16 h-16 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition">
                {category.icon}
              </div>

              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {category.name}
              </h3>

              <p className="text-green-600 font-medium mb-3">
                {category.ideas}
              </p>

              <p className="text-gray-600">
                {category.desc}
              </p>

              <button className="mt-6 text-green-600 font-semibold hover:text-green-700 transition">
                Explore Ideas →
              </button>
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="mt-20 bg-white rounded-3xl shadow-lg p-10">
  <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
    
    <div>
      <h3 className="text-4xl font-bold text-green-600">
        <CountUp end={500} duration={3} />.k+
      </h3>
      <p className="text-gray-600 mt-2">Ideas Shared</p>
    </div>

    <div>
      <h3 className="text-4xl font-bold text-green-600">
        <CountUp end={2000} duration={3} />.k+
      </h3>
      <p className="text-gray-600 mt-2">Community Members</p>
    </div>

    <div>
      <h3 className="text-4xl font-bold text-green-600">
        <CountUp end={1500} duration={3} />.k+
      </h3>
      <p className="text-gray-600 mt-2">Comments Posted</p>
    </div>

    <div>
      <h3 className="text-4xl font-bold text-green-600">
        <CountUp end={50} duration={3} />.k+
      </h3>
      <p className="text-gray-600 mt-2">Startup Success Stories</p>
    </div>

  </div>
</div>
      </div>
    </section>
  );
}