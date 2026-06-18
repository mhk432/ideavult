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

  // ================= FETCH (NO JWT) =================


const fetchIdeas = async () => {
  try {
    setLoading(true);

    const session = await authClient.getSession();
    const user = session?.data?.user;

    if (!user) return;

    const res = await fetch(
      `http://localhost:5000/my-ideas?userId=${user.id}`
    );

    const data = await res.json();

    setIdeas(data);
  } catch (err) {
    console.log(err);
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
       <div className="fixed top-0 left-0 right-0 z-50 h-20 bg-base-100/95 backdrop-blur-md border-b border-base-300 flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-green-500"></span>
      </div>
    );
  }

  return (
    <>
      <Toaster />

      <div className="my-20 px-4 sm:px-8 lg:px-20">

        <h1 className="text-3xl font-bold mb-6">My Ideas</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {ideas.map((idea) => (
            <div key={idea._id} className="bg-white border rounded-xl p-4">

              <Image
                src={idea.imageURL || "/placeholder.png"}
                width={400}
                height={200}
                alt="idea"
                className="w-full h-56"

              />

              <h2 className="font-bold mt-2">{idea.title}</h2>
              <p className="text-sm text-gray-500">
                {idea.shortDescription}
              </p>

              {/* TAGS */}
              <div className="flex flex-wrap gap-2 mt-2">
                {idea.tags?.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-green-100 text-green-700 px-2 py-1 text-xs rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <p className="border-b mt-2"></p>

              <div className="flex   gap-2 mt-3 ">

                <button onClick={() => openUpdate(idea)} 
                className="text-blue-600 bg-blue-200 text-2xl p-2 rounded-md">
                   <FaEdit />
                </button>

                <button onClick={() => {
                  setSelectedIdea(idea);
                  setIsDeleteOpen(true);
                }}  className="text-red-600 bg-red-100
                 text-2xl p-2 rounded-md">
                  <MdDelete />
                </button>

              </div>

            </div>
          ))}

        </div>
      </div>

      {/* UPDATE MODAL */}
      {isUpdateOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-5 w-[500px] rounded">

            <div className="flex justify-between">
              <h2>Update Idea</h2>
              <IoClose onClick={() => setIsUpdateOpen(false)} />
            </div>

            {Object.keys(formData).map((key) => (
              <input
                key={key}
                name={key}
                value={formData[key]}
                onChange={handleChange}
                className="w-full border p-2 mt-2"
                placeholder={key}
              />
            ))}

            <button
              onClick={handleUpdate}
              className="bg-green-600 text-white w-full mt-3 p-2"
            >
              Save
            </button>

          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {isDeleteOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-5 rounded w-[350px]">

            <h2>Delete Idea</h2>

            <p className="mt-2 ">
              Are you sure you want to delete <span className="text-red-500">{selectedIdea?.title}?</span>
            </p>

            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => setIsDeleteOpen(false)}>
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-3 py-1"
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