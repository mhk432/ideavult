'use client'

import Image from "next/image";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import toast, { Toaster } from "react-hot-toast";

const MyIdeas = ({ refresh }) => {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
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

  // FETCH
  const fetchIdeas = async () => {
    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/my-ideas", {
        cache: "no-store",
      });

      const data = await res.json();
      setIdeas(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load ideas");
      setIdeas([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIdeas();
  }, [refresh]);

  // OPEN UPDATE
  const openUpdateModal = (idea) => {
    setSelectedIdea(idea);

    setFormData({
      title: idea.title || "",
      shortDescription: idea.shortDescription || "",
      detailedDescription: idea.detailedDescription || "",
      category: idea.category || "",
      tags: Array.isArray(idea.tags) ? idea.tags.join(", ") : "",
      imageURL: idea.imageURL || "",
      estimatedBudget: idea.estimatedBudget || "",
      targetAudience: idea.targetAudience || "",
      problemStatement: idea.problemStatement || "",
      proposedSolution: idea.proposedSolution || "",
    });

    setIsUpdateOpen(true);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ================= UPDATE =================
  const handleUpdate = async () => {
    try {
      const updatedData = {
        ...formData,
        tags: formData.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      };

      const res = await fetch(
        `http://localhost:5000/ideas/${selectedIdea._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      const data = await res.json();

      if (data.modifiedCount > 0) {
        fetchIdeas();
        setIsUpdateOpen(false);
        toast.success("Idea updated successfully 🎉");
      } else {
        toast.error("No changes made");
      }
    } catch (error) {
      console.log(error);
      toast.error("Update failed");
    }
  };

  // ================= DELETE =================
  const openDeleteModal = (idea) => {
    setSelectedIdea(idea);
    setIsDeleteOpen(true);
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/ideas/${selectedIdea._id}`,
        { method: "DELETE" }
      );

      const data = await res.json();

      if (data.deletedCount > 0) {
        setIdeas((prev) =>
          prev.filter((i) => i._id !== selectedIdea._id)
        );

        setIsDeleteOpen(false);

        toast.success("Idea deleted successfully ");
      } else {
        toast.error("Delete failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  if (loading) {
    return (
      <span className="loading loading-bars my-10 loading-xl mx-auto text-center text-red-500"></span>
    );
  }

  return (
    <>
      <Toaster position="top-right" />

      {/* ================= CARDS ================= */}
      <div className="mt-20 px-4 sm:px-6 md:px-10 lg:px-20">

        <h1 className="text-2xl sm:text-3xl font-bold mb-6">
          My Ideas
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {ideas.map((idea) => (
            <div
              key={idea._id}
              className="bg-white shadow-md hover:shadow-xl transition rounded-2xl p-4"
            >

              <Image
                src={idea.imageURL || "/placeholder.png"}
                alt={idea.title}
                width={500}
                height={300}
                className="rounded-xl w-full object-cover"
              />

              <h2 className="font-bold mt-3 text-lg">
                {idea.title}
              </h2>

              <div className="flex flex-wrap gap-2 mt-2">
                {Array.isArray(idea.tags) &&
                  idea.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs font-semibold bg-lime-200 text-lime-800 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
              </div>

              <p className="py-2 text-gray-600 text-sm">
                {idea.shortDescription}
              </p>

              <p className="border-b my-3"></p>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => openUpdateModal(idea)}
                  className="bg-gray-200 hover:bg-gray-300 text-blue-600 p-2 rounded text-3xl"
                >
                  <FaEdit />
                </button>

                <button
                  onClick={() => openDeleteModal(idea)}
                  className="bg-gray-200 hover:bg-gray-300 text-red-600 p-2 rounded text-3xl"
                >
                  <MdDelete />
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* ================= UPDATE MODAL ================= */}
      {isUpdateOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">

          <div className="bg-white w-full max-w-lg p-5 rounded-xl max-h-[90vh] overflow-y-auto">

            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Update Idea</h2>
              <IoClose
                onClick={() => setIsUpdateOpen(false)}
                className="text-2xl cursor-pointer"
              />
            </div>

            <div className="mt-4 space-y-3">
              {Object.keys(formData).map((key) =>
                key !== "tags" ? (
                  <input
                    key={key}
                    name={key}
                    value={formData[key]}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg"
                  />
                ) : (
                  <input
                    key={key}
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg"
                  />
                )
              )}
            </div>

            <button
              onClick={handleUpdate}
              className="w-full mt-5 bg-green-600 text-white p-3 rounded-xl"
            >
              Save Changes
            </button>

          </div>
        </div>
      )}

      {/* ================= DELETE MODAL ================= */}
      {isDeleteOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">

          <div className="bg-white w-full max-w-md rounded-2xl p-6">

            <h2 className="text-xl font-bold">Delete Idea</h2>

            <p className="text-center mt-3">
              Are you sure want to delete{" "}
              <span className="text-red-500 font-semibold">
                {selectedIdea?.title}
              </span> ?
            </p>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setIsDeleteOpen(false)}
                className="px-4 py-2 border rounded-xl"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-xl"
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