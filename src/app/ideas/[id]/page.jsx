import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import CommentSection from "./CommentSection"; 
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const DetailsPage = async ({ params }) => {
    const { id } = await params;  

    const token = await auth.api.getToken({
        headers : await headers()
    })

      console.log(token)

    let ideas;
    try {
        const res = await fetch(`http://localhost:5000/ideas/${id}`, {
            // headers :{
            //     authorization :`Bearer ${token.token}`

            // },
            cache: "no-store"  
        });
        ideas = await res.json();
    } catch (error) {
        console.error(error);
        ideas = null;
    }

    if (!ideas) {
        return <div className="text-center py-20 text-red-500 text-xl">Idea not found!</div>;
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
          
            {/* Back Button */}
            <Link 
                href="/ideas" 
                className="inline-flex items-center gap-2
                 text-green-600 hover:text-red-500 mb-6 mt-20 font-medium"
            >
                <FaArrowLeft /> Back to Ideas
            </Link>

            {/* Image */}
            <div className="relative w-full h-[400px] rounded-3xl overflow-hidden mb-8 shadow-lg">
                <Image
                    src={ideas.imageURL}
                    alt={ideas.title}
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* Category & Time */}
            <div className="flex items-center gap-3 text-sm mb-2">
                <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full font-medium">
                    {ideas.category}
                </span>
                <span className="text-gray-500">2w ago</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-4">
                {ideas.title}
            </h1>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
                {ideas.tags?.map((tag, index) => (
                    <span
                        key={index}
                        className="bg-lime-200 text-green-700 px-4 py-1.5 rounded-full text-sm"
                    >
                        #{tag.toLowerCase()}
                    </span>
                ))}
            </div>

            {/* Short Description */}
            <p className="text-xl text-gray-700 leading-relaxed mb-10 border-l-4 border-gray-300 pl-4">
                {ideas.shortDescription}
            </p>

            {/* 2 Column Layout */}
            <div className="grid md:grid-cols-2 gap-8 mb-10">
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800">Detailed Description</h3>
                    <p className="text-gray-700 leading-relaxed">{ideas.detailedDescription}</p>
                </div>

                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                    <h3 className="text-xl font-semibold mb-4 text-red-600">Problem Statement</h3>
                    <p className="text-gray-700 leading-relaxed">{ideas.problemStatement}</p>
                </div>

                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                    <h3 className="text-xl font-semibold mb-4 text-emerald-600">Proposed Solution</h3>
                    <p className="text-gray-700 leading-relaxed">{ideas.proposedSolution}</p>
                </div>

                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                    <h3 className="text-xl font-semibold mb-4 text-purple-600">Target Audience</h3>
                    <p className="text-gray-700 leading-relaxed">{ideas.targetAudience}</p>
                </div>
            </div>

            {/* Budget */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 rounded-3xl p-8 mb-12">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div>
                        <h3 className="text-xl font-semibold text-gray-800">Estimated Budget</h3>
                        <p className="text-gray-600 mt-1">Required Investment</p>
                    </div>
                    <p className="text-4xl font-bold text-green-600">
                        ${ideas.estimatedBudget}
                    </p>
                </div>
            </div>

            {/* Posted Date */}
            <p className="text-gray-500 text-center mb-12">
                Posted on May 21, 2026
            </p>

            {/* Comment Section (Client Component) */}
            <CommentSection ideaId={id} showInput={true}/>
        </div>
    );
};

export default DetailsPage;