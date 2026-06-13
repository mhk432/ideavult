"use client";

import CountUp from "react-countup";

export default function WhyChooseIdeaVault() {
  const features = [
    {
      icon: "💡",
      title: "Share Ideas",
      desc: "Publish innovative startup concepts and inspire the community.",
    },
    {
      icon: "🤝",
      title: "Get Feedback",
      desc: "Receive valuable suggestions from entrepreneurs and creators.",
    },
    {
      icon: "🚀",
      title: "Validate Concepts",
      desc: "Test your idea before investing significant resources.",
    },
    {
      icon: "🌍",
      title: "Build Network",
      desc: "Connect with innovators and future collaborators worldwide.",
    },
  ];

  const journey = [
    {
      step: "1️⃣",
      title: "Share",
      desc: "Post your startup idea and introduce it to the community.",
      bg: "bg-lime-50",
    },
    {
      step: "2️⃣",
      title: "Engage",
      desc: "Receive comments, discussions, and constructive feedback.",
      bg: "bg-blue-50",
    },
    {
      step: "3️⃣",
      title: "Refine",
      desc: "Improve your concept using community insights.",
      bg: "bg-purple-50",
    },
    {
      step: "4️⃣",
      title: "Launch",
      desc: "Turn your validated idea into a real startup.",
      bg: "bg-green-50",
    },
  ];

  return (
    <section className="relative py-24   overflow-hidden">
      
      {/* Decorative Blur Effects */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-lime-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-green-200/30 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        {/* Heading */}
        <div className="text-center mb-16">
          <span className="bg-lime-100 text-lime-700 px-5 py-2 rounded-full text-sm font-medium">
            Why Innovators Love IdeaVault
          </span>

          <h2 className="text-4xl md:text-5xl font-bold mt-6 text-gray-900">
            Turn Ideas Into
            <span className="text-lime-500"> Real Opportunities</span>
          </h2>

          <p className="mt-5 text-gray-600 max-w-3xl mx-auto text-lg">
            IdeaVault is more than a platform. It is a place where creators,
            entrepreneurs, and innovators collaborate to transform concepts
            into successful businesses.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, index) => (
            <div
              key={index}
              className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="text-5xl mb-5 group-hover:scale-110 transition">
                {item.icon}
              </div>

              <h3 className="text-2xl font-bold mb-3 text-gray-900">
                {item.title}
              </h3>

              <p className="text-gray-600">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 bg-white rounded-3xl shadow-xl p-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            
            <div>
              <h3 className="text-4xl font-bold text-lime-600">
                <CountUp end={500} duration={3} />+
              </h3>
              <p className="text-gray-600 mt-2">
                Ideas Shared
              </p>
            </div>

            <div>
              <h3 className="text-4xl font-bold text-lime-600">
                <CountUp end={2000} duration={3} />+
              </h3>
              <p className="text-gray-600 mt-2">
                Active Innovators
              </p>
            </div>

            <div>
              <h3 className="text-4xl font-bold text-lime-600">
                <CountUp end={1500} duration={3} />+
              </h3>
              <p className="text-gray-600 mt-2">
                Comments Posted
              </p>
            </div>

            <div>
              <h3 className="text-4xl font-bold text-lime-600">
                <CountUp end={50} duration={3} />+
              </h3>
              <p className="text-gray-600 mt-2">
                Startup Success Stories
              </p>
            </div>

          </div>
        </div>

        {/* Startup Journey */}
        <div className="mt-24">
          <h3 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Your Startup Journey
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {journey.map((item, index) => (
              <div
                key={index}
                className={`${item.bg} rounded-3xl p-6 text-center hover:shadow-lg transition`}
              >
                <div className="text-4xl mb-4">
                  {item.step}
                </div>

                <h4 className="text-xl font-bold mb-2">
                  {item.title}
                </h4>

                <p className="text-gray-600">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-lime-500 to-green-500 rounded-3xl p-10 text-white shadow-xl">
            <h3 className="text-3xl font-bold mb-4">
              Ready to Share Your Next Big Idea?
            </h3>

            <p className="max-w-2xl mx-auto mb-6 text-white/90">
              Join thousands of innovators who are turning ideas into
              opportunities through collaboration and feedback.
            </p>

            <button className="bg-white text-green-600 px-8 py-3 rounded-full font-semibold hover:scale-105 transition">
              Start Sharing Today
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}