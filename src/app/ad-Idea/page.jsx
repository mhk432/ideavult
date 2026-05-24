
'use client'

import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { IoIosArrowRoundForward } from "react-icons/io";

const AddIdea = () => {
  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    detailedDescription: "",
    category: "",
    tags: "",
    imageURL: "",
    budget: "",
    targetAudience: "",
    problemStatement: "",
    proposedSolution: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Database API call
      const response = await fetch("http://localhost:5000/ideas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.insertedId) {
        toast.success("Idea Added Successfully!");
      }

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-2xl my-20 mx-auto p-6 bg-gray-200
     shadow-lg rounded-xl mt-10">

      <h2 className="text-3xl font-bold text-center mb-6">
        Add Startup Idea
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4 ">

        <input
          type="text"
          name="title"
          placeholder="Idea Title"
          onChange={handleChange}
          className="w-full border p-3 rounded bg-white"
          required
        />

        <input
          type="text"
          name="shortDescription"
          placeholder="Short Description"
          onChange={handleChange}
          className="w-full border p-3 rounded bg-white"
          required
        />

        <textarea
          name="detailedDescription"
          placeholder="Detailed Description"
          onChange={handleChange}
          className="w-full border p-3 rounded h-28 bg-white"
          required
        />

        <select
          name="category"
          onChange={handleChange}
          className="w-full border p-3 rounded bg-white"
          required
        >
          <option value="">Select Category</option>
          <option>Tech</option>
          <option>Health</option>
          <option>AI</option>
          <option>Education</option>
          <option>Business</option>
        </select>

        <input
          type="text"
          name="tags"
          placeholder="Tags (optional)"
          onChange={handleChange}
          className="w-full border p-3 rounded bg-white"
        />

        <input
          type="url"
          name="imageURL"
          placeholder="Image URL"
          onChange={handleChange}
          className="w-full border p-3 rounded bg-white"
          required
        />

        <input
          type="number"
          name="budget"
          placeholder="Estimated Budget (optional)"
          onChange={handleChange}
          className="w-full border p-3 rounded bg-white"
        />

        <input
          type="text"
          name="targetAudience"
          placeholder="Target Audience"
          onChange={handleChange}
          className="w-full border p-3 rounded bg-white"
          required
        />

        <textarea
          name="problemStatement"
          placeholder="Problem Statement"
          onChange={handleChange}
          className="w-full border p-3 rounded h-24 bg-white"
          required
        />

        <textarea
          name="proposedSolution"
          placeholder="Proposed Solution"
          onChange={handleChange}
          className="w-full border p-3 rounded h-24 bg-white"
          required
        />

        <button
          type="submit"
          className="w-full bg-lime-500 text-white
           p-3 rounded-full  flex justify-center"
           >
          Submit Idea <IoIosArrowRoundForward size={30} />
        </button>

      </form>
      <Toaster />
    </div>
  );
};

export default AddIdea;