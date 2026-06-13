"use client";

import Link from "next/link";
import { FaArrowLeft, FaCommentDots } from "react-icons/fa";
import { useState, useEffect } from "react";
import CommentSection from "../ideas/[id]/CommentSection";

export default function MyInteractions() {
    const [interactions, setInteractions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const currentDateTime = new Date().toLocaleString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });

    useEffect(() => {
        const fetchMyInteractions = async () => {
            try {
                const res = await fetch("http://localhost:5000/my-interactions");

                if (!res.ok) {
                    throw new Error(`HTTP Error: ${res.status}`);
                }

                const data = await res.json();
                setInteractions(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error(err);
                setError(
                    "Failed to load interactions. Please check if backend is running."
                );
                setInteractions([]);
            } finally {
                setLoading(false);
            }
        };

        fetchMyInteractions();
    }, []);

    return (
        <div className="min-h-screen  py-10">
            <div className="max-w-5xl mx-auto px-4">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-3">
                        <Link
                            href="/ideas"
                            className="text-green-600 hover:text-green-700"
                        >
                            <FaArrowLeft size={28} />
                        </Link>

                        <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
                            <FaCommentDots className="text-green-600" />
                            My Interactions
                        </h1>
                    </div>

                    <p className="font-medium text-gray-700">
                        {currentDateTime}
                    </p>
                </div>

                <p className="text-gray-600 mb-10">
                    Ideas you have commented on
                </p>

                {/* Loading Spinner */}
                {loading && (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="w-14 h-14 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                        <p className="mt-4 text-gray-600">
                            Loading interactions...
                        </p>
                    </div>
                )}

                {/* Error */}
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 p-8 rounded-2xl text-center">
                        {error}
                    </div>
                )}

                {/* Empty State */}
                {!loading && !error && interactions.length === 0 && (
                    <div className="bg-white rounded-3xl p-20 text-center shadow">
                        <FaCommentDots className="mx-auto text-7xl text-gray-300 mb-6" />
                        <p className="text-xl text-gray-500">
                            You have not commented on any idea yet.
                        </p>
                    </div>
                )}

                {/* Interactions */}
                <div className="space-y-10">
                    {interactions.map((idea) => (
                        <div
                            key={idea._id}
                            className="bg-white rounded-3xl shadow-lg overflow-hidden"
                        >
                            {/* Idea Info */}
                            <div className="p-6 border-b">
                                <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm">
                                    {idea.category}
                                </span>

                                <h2 className="text-2xl font-semibold mt-3">
                                    {idea.title}
                                </h2>

                                <div className="flex flex-wrap gap-2 my-6">
                                    {idea.tags?.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="bg-lime-200 text-green-700 px-4 py-1.5 rounded-full text-sm"
                                        >
                                            #{tag.toLowerCase()}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Comments */}
                            <div className="p-6">
                                <CommentSection
                                    ideaId={idea._id}
                                    showInput={false}
                                />
                            </div>

                            {/* Button */}
                            <div className="p-6 border-t bg-gray-50 flex justify-end">
                                <Link
                                    href={`/ideas/${idea._id}`}
                                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-2xl font-medium transition flex items-center gap-2"
                                >
                                    View Full Idea →
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}