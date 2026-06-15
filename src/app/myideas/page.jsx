'use client'

import Image from "next/image";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoClose } from "react-icons/io5";

const MyIdeas = ({ refresh }) => {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedIdea, setSelectedIdea] = useState(null);

  // FULL FORM STATE
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
      setIdeas([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIdeas();
  }, [refresh]);

  // OPEN UPDATE MODAL
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

  // INPUT CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // UPDATE API
  const handleUpdate = async () => {
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
    }
  };

  // DELETE
  const openDeleteModal = (idea) => {
    setSelectedIdea(idea);
    setIsDeleteOpen(true);
  };

  const handleDelete = async () => {
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
    }
  };

  if (loading) {
    return (
      
      <span className="loading loading-bars my-10 loading-xl mx-auto text-center text-red-500"></span>
    );
  }

  return (
    <>
      <div className="my-20 mx-10">
        <h1 className="text-3xl font-bold mb-6">My Ideas</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ideas.map((idea) => (
            <div key={idea._id} className="bg-white shadow rounded-2xl p-4">

              <Image
                src={idea.imageURL || "/placeholder.png"}
                alt={idea.title}
                width={500}
                height={300}
                className="rounded-xl"
              />

              <h2 className="font-bold mt-3">{idea.title}</h2>
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

          <p className="py-2 text-gray-600">{idea.shortDescription}</p>


            <p className="border-b-2 py-4  "></p>

              <div className="flex  justify-end gap-2 mt-4 mx-auto">
                <button
                  onClick={() => openUpdateModal(idea)}
                  className="bg-gray-300 text-blue-500  p-2 py-1 rounded text-3xl"
                >
                  <FaEdit />
                </button>

                <button
                  onClick={() => openDeleteModal(idea)}
                  className="bg-gray-300 text-red-600 px-3 py-1 rounded text-3xl"
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
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="bg-white w-[600px] p-5 rounded-xl max-h-[90vh] overflow-y-auto">

            <div className="flex justify-between">
              <h2 className="text-xl font-bold">Update Idea</h2>
              <IoClose onClick={() => setIsUpdateOpen(false)} />
            </div>

            {Object.keys(formData).map((key) => (
              key !== "tags" ? (
                <input
                  key={key}
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  placeholder={key}
                  className="w-full border p-2 mt-2 rounded"
                />
              ) : (
                <input
                  key={key}
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="tags (comma separated)"
                  className="w-full border p-2 mt-2 rounded"
                />
              )
            ))}

            <button
              onClick={handleUpdate}
              className="w-full mt-4 bg-green-600 text-white p-2 rounded"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}

     
      {/* ================= DELETE MODAL ================= */}
{isDeleteOpen && (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
    <div className="bg-white w-[420px] rounded-2xl p-6 shadow-xl">

      <h2 className="text-xl font-bold text-gray-900">
        Delete Idea
      </h2>
      <p className="border-b my-2 border-1"></p>
             <div className="text-center">

      <p className="mt-3 text-gray-600">
        Are you sure you want to delete{" "}
        <span className="font-semibold text-red-500">{selectedIdea?.title}
        </span>
        ?
      </p>

      <p className="text-sm text-gray-400 mt-2">
        This action cannot be undone.
      </p>
             </div>
             <p className="border-b my-2 border-1"></p>

      <div className="flex  justify-end gap-3 mt-6">
      
        <button
          onClick={() => setIsDeleteOpen(false)}
          className="px-4 py-2 rounded-xl border hover:bg-gray-100"
        >
          Cancel
        </button>

        <button
          onClick={handleDelete}
          className=" px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700"
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