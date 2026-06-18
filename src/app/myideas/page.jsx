'use client'

import Image from "next/image";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { Toaster, toast } from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const MyIdeas = ({ refresh }) => {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);

  const [selectedIdea, setSelectedIdea] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    detailedDescription: "",
    category: "",
    tags: "",
    imageURL: "",
    estimatedBudget: "",
    targetAudience: "",
    problemStatement: "",
    proposedSolution: "",
  });

  // ================= FETCH =================
  const fetchIdeas = async () => {
    try {
      setLoading(true);

      const session = await authClient.getSession();

      const token =
        session?.data?.session?.token ||
        session?.data?.sessionToken ||
        session?.data?.token;

      const res = await fetch("http://localhost:5000/my-ideas", {
        cache: "no-store",
        headers: {
          Authorization: `Bearer ${token || ""}`,
        },
      });

      if (!res.ok) {
        setIdeas([]);
        return;
      }

      const data = await res.json();
      setIdeas(Array.isArray(data) ? data : []);

    } catch (err) {
      setIdeas([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIdeas();
  }, [refresh]);

  // ================= OPEN UPDATE =================
  const openUpdate = (idea) => {
    setSelectedIdea(idea);

    setFormData({
      title: idea.title || "",
      shortDescription: idea.shortDescription || "",
      detailedDescription: idea.detailedDescription || "",
      category: idea.category || "",
      tags: idea.tags?.join(", ") || "",
      imageURL: idea.imageURL || "",
      estimatedBudget: idea.estimatedBudget || "",
      targetAudience: idea.targetAudience || "",
      problemStatement: idea.problemStatement || "",
      proposedSolution: idea.proposedSolution || "",
    });

    setIsUpdateOpen(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ================= UPDATE =================
  const handleUpdate = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/ideas/${selectedIdea._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            tags: formData.tags.split(",").map(t => t.trim())
          }),
        }
      );

      const data = await res.json();

      if (data.modifiedCount > 0) {
        toast.success("Idea updated 🚀");
        setIsUpdateOpen(false);
        fetchIdeas();
      } else {
        toast.error("No changes found");
      }

    } catch (err) {
      toast.error("Update failed");
    }
  };

  // ================= DELETE =================
  const handleDelete = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/ideas/${selectedIdea._id}`,
        { method: "DELETE" }
      );

      const data = await res.json();

      if (data.deletedCount > 0) {
        setIdeas(prev => prev.filter(i => i._id !== selectedIdea._id));
        setIsDeleteOpen(false);
        toast.success("Deleted successfully");
      } else {
        toast.error("Delete failed");
      }

    } catch (err) {
      toast.error("Error");
    }
  };

  if (loading) {
    return (
      <p className="text-center mt-20 text-gray-500">
        Loading your ideas...
      </p>
    );
  }

  return (
    <>
      <Toaster />

      <div className="my-20 px-4 sm:px-8 lg:px-20">

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            My Ideas
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage all your creative ideas in one place
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {ideas.map((idea) => (
            <div
              key={idea._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden border"
            >

              {/* IMAGE */}
              <div className="relative h-48 w-full">
                <Image
                  src={idea.imageURL || "/placeholder.png"}
                  fill
                  className="object-cover"
                  alt="idea"
                />
              </div>

              {/* CONTENT */}
              <div className="p-4">

                <h2 className="font-bold text-lg text-gray-800">
                  {idea.title}
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  {idea.shortDescription}
                </p>

                {/* TAGS */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {idea.tags?.map((tag, i) => (
                    <span
                      key={i}
                      className="
                        text-xs px-3 py-1 rounded-full
                        bg-gradient-to-r from-green-100 to-lime-100
                        text-green-700 border border-green-200
                      "
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                   <p className="border-b mt-2"></p>
                {/* ACTIONS */}
                <div className="flex justify-end gap-3 mt-5">

                  <button
                    onClick={() => openUpdate(idea)}
                    className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600"
                  >
                    <FaEdit />
                  </button>

                  <button
                    onClick={() => {
                      setSelectedIdea(idea);
                      setIsDeleteOpen(true);
                    }}
                    className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600"
                  >
                    <MdDelete />
                  </button>

                </div>

              </div>
            </div>
          ))}

        </div>
      </div>

      {/* ================= UPDATE MODAL ================= */}
      {isUpdateOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">

          <div className="bg-white w-full max-w-xl rounded-2xl p-6">

            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-lg">Update Idea</h2>
              <IoClose
                onClick={() => setIsUpdateOpen(false)}
                className="text-2xl cursor-pointer"
              />
            </div>

            <div className="space-y-3 max-h-[60vh] overflow-y-auto">

              {Object.keys(formData).map((key) => (
                <input
                  key={key}
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  placeholder={key}
                  className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-green-400"
                />
              ))}

            </div>

            <button
              onClick={handleUpdate}
              className="w-full mt-5 bg-green-600 hover:bg-green-700 text-white p-3 rounded-xl"
            >
              Save Changes
            </button>

          </div>
        </div>
      )}

      {/* ================= DELETE MODAL ================= */}
      {isDeleteOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">

          <div className="bg-white w-full max-w-md rounded-2xl p-6">

            <h2 className="text-xl font-bold">Delete Idea</h2>

            <p className="mt-4 text-gray-600">
              Are you sure you want to delete{" "}
              <span className="text-red-600 font-semibold">
                {selectedIdea?.title}
              </span>?
            </p>

            <p className="text-sm text-gray-400 mt-2">
              This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3 mt-6">

              <button
                onClick={() => setIsDeleteOpen(false)}
                className="px-4 py-2 rounded-lg border"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </button>

            </div>

          </div>
        </div>
      )}

    </>
  );
};

export default MyIdeas;