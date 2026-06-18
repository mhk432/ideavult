// 'use client'

// import { Button } from "@heroui/react";
// import { useState } from "react";
// import toast, { Toaster } from "react-hot-toast";
// import { IoIosArrowRoundForward } from "react-icons/io";
// import { IoClose } from "react-icons/io5";

// const AddIdea = () => {
//   const [ideas, setIdeas] = useState({
//     title: "",
//     shortDescription: "",
//     detailedDescription: "",
//     category: "",
//     imageURL: "",
//     estimatedBudget: "",
//     targetAudience: "",
//     problemStatement: "",
//     proposedSolution: "",
//   });

//   const [tags, setTags] = useState([]);
//   const [tagInput, setTagInput] = useState("");

//   const handleChange = (e) => {
//     setIdeas({
//       ...ideas,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleTagKeyDown = (e) => {
//     if (e.key === "Enter") {
//       e.preventDefault();

//       const value = tagInput.trim();

//       if (!value) return;

//       if (tags.includes(value)) {
//         toast.error("Tag already added");
//         return;
//       }

//       setTags([...tags, value]);
//       setTagInput("");
//     }
//   };

//   const removeTag = (indexToRemove) => {
//     setTags(tags.filter((_, index) => index !== indexToRemove));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const newIdea = {
//       ...ideas,
//       tags,
//         userId: "my-self",// userId: user._id  
//     };

//     console.log("Sending Data:", newIdea);

//     try {
//       const res = await fetch("http://localhost:5000/ideas", {
//         method: "POST",
//         headers: {
//           "content-type": "application/json",
//         },
//         body: JSON.stringify(newIdea),
//       });

//       const data = await res.json();

//       if (data.insertedId || data.acknowledged) {
//         toast.success("Idea Added Successfully!");

//         setIdeas({
//           title: "",
//           shortDescription: "",
//           detailedDescription: "",
//           category: "",
//           imageURL: "",
//           estimatedBudget: "",
//           targetAudience: "",
//           problemStatement: "",
//           proposedSolution: "",
//         });

//         setTags([]);
//         setTagInput("");
//         e.target.reset();
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to add idea");
//     }
//   };

//   return (
//     <div className="max-w-2xl my-20 mx-auto p-6 bg-gray-200 shadow-lg rounded-xl">
//       <h2 className="text-3xl font-bold text-center mb-6">
//         Add Startup Idea
//       </h2>

//       <form onSubmit={handleSubmit} className="space-y-4">

//         <input
//           type="text"
//           name="title"
//           placeholder="Idea Title"
//           onChange={handleChange}
//           className="w-full border p-3 bg-white rounded-2xl shadow-2xl"
//           required
//         />

//         <input
//           type="text"
//           name="shortDescription"
//           placeholder="Short Description"
//           onChange={handleChange}
//           className="w-full border p-3 bg-white rounded-2xl shadow-2xl"
//           required
//         />

//         <textarea
//           name="detailedDescription"
//           placeholder="Detailed Description"
//           onChange={handleChange}
//           className="w-full border p-3 h-28 bg-white rounded-2xl shadow-2xl"
//           required
//         />

//         <select
//           name="category"
//           onChange={handleChange}
//           className="w-full border p-3 bg-white rounded-2xl shadow-2xl"
//           required
//         >
//           <option value="">Select Category</option>
//           <option>Tech</option>
//           <option>Health</option>
//           <option>AI</option>
//           <option>Education</option>
//           <option>Business</option>
//           <option>Agriculture</option>
//           <option>Finance</option>
//         </select>

//         {/* Tags Input */}
//         <div className="bg-white p-3 rounded-2xl shadow-2xl border">
//           <input
//             type="text"
//             value={tagInput}
//             placeholder="Type a tag and press Enter"
//             onChange={(e) => setTagInput(e.target.value)}
//             onKeyDown={handleTagKeyDown}
//             className="w-full outline-none"
//           />

//           {tags.length > 0 && (
//             <div className="flex flex-wrap gap-2 mt-3">
//               {tags.map((tag, index) => (
//                 <div
//                   key={index}
//                   className="flex items-center gap-1 bg-blue-500 text-white px-3 py-1 rounded-full text-sm"
//                 >
//                   <span>{tag}</span>

//                   <button
//                     type="button"
//                     onClick={() => removeTag(index)}
//                     className="cursor-pointer"
//                   >
//                     <IoClose size={16} />
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         <input
//           type="url"
//           name="imageURL"
//           placeholder="Image URL"
//           onChange={handleChange}
//           className="w-full border p-3 bg-white rounded-2xl shadow-2xl"
//           required
//         />

//         <input
//           type="number"
//           name="estimatedBudget"
//           placeholder="Estimated Budget"
//           onChange={handleChange}
//           className="w-full border p-3 bg-white rounded-2xl shadow-2xl"
//         />

//         <input
//           type="text"
//           name="targetAudience"
//           placeholder="Target Audience"
//           onChange={handleChange}
//           className="w-full border p-3 bg-white rounded-2xl shadow-2xl"
//           required
//         />

//         <textarea
//           name="problemStatement"
//           placeholder="Problem Statement"
//           onChange={handleChange}
//           className="w-full border p-3 h-24 bg-white rounded-2xl shadow-2xl"
//           required
//         />

//         <textarea
//           name="proposedSolution"
//           placeholder="Proposed Solution"
//           onChange={handleChange}
//           className="w-full border p-3 h-24 bg-white rounded-2xl shadow-2xl"
//           required
//         />

//         <Button
//           type="submit"
//           className="w-full py-6 bg-lime-500 text-blue-600 text-xl rounded-full flex justify-center items-center shadow-2xl"
//         >
//           Submit <IoIosArrowRoundForward />
//         </Button>

//       </form>

//       <Toaster />
//     </div>
//   );
// };

// export default AddIdea;


'use client'

import { Button } from "@heroui/react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { IoIosArrowRoundForward } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { authClient } from "@/lib/auth-client";

const AddIdea = () => {
  const [ideas, setIdeas] = useState({
    title: "",
    shortDescription: "",
    detailedDescription: "",
    category: "",
    imageURL: "",
    estimatedBudget: "",
    targetAudience: "",
    problemStatement: "",
    proposedSolution: "",
  });

  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [loading, setLoading] = useState(false);

  // ================= HANDLE INPUT =================
  const handleChange = (e) => {
    setIdeas({
      ...ideas,
      [e.target.name]: e.target.value,
    });
  };

  // ================= TAGS =================
  const handleTagKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const value = tagInput.trim();
      if (!value) return;

      if (tags.includes(value)) {
        toast.error("Tag already added");
        return;
      }

      setTags([...tags, value]);
      setTagInput("");
    }
  };

  const removeTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const session = await authClient.getSession();

      const user = session?.data?.user;

      if (!user) {
        toast.error("Please login first");
        return;
      }

      // 🔥 ONLY IMPORTANT CHANGE (backend compatible)
      const newIdea = {
        ...ideas,
        tags,

        // ✅ IMPORTANT: backend use this
        userId: user.id,
        userEmail: user.email,
        userName: user.name,
      };

      const res = await fetch("http://localhost:5000/ideas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newIdea),
      });

      const data = await res.json();

      if (data.insertedId || data.acknowledged) {
        toast.success("Idea Added Successfully!");

        setIdeas({
          title: "",
          shortDescription: "",
          detailedDescription: "",
          category: "",
          imageURL: "",
          estimatedBudget: "",
          targetAudience: "",
          problemStatement: "",
          proposedSolution: "",
        });

        setTags([]);
        setTagInput("");
        e.target.reset();
      } else {
        toast.error("Failed to add idea");
      }

    } catch (error) {
      console.error(error);
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  // ================= UI =================
  return (
    <div className="max-w-2xl my-20 mx-auto p-6 bg-gray-200 shadow-lg rounded-xl">
      <h2 className="text-3xl font-bold text-center mb-6">
        Add Startup Idea
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="title"
          placeholder="Idea Title"
          onChange={handleChange}
          className="w-full border p-3 bg-white rounded-2xl"
          required
        />

        <input
          type="text"
          name="shortDescription"
          placeholder="Short Description"
          onChange={handleChange}
          className="w-full border p-3 bg-white rounded-2xl"
          required
        />

        <textarea
          name="detailedDescription"
          placeholder="Detailed Description"
          onChange={handleChange}
          className="w-full border p-3 h-28 bg-white rounded-2xl"
          required
        />

        <select
          name="category"
          onChange={handleChange}
          className="w-full border p-3 bg-white rounded-2xl"
          required
        >
          <option value="">Select Category</option>
          <option>Tech</option>
          <option>Health</option>
          <option>AI</option>
          <option>Education</option>
          <option>Business</option>
          <option>Agriculture</option>
          <option>Finance</option>
        </select>

        {/* TAGS */}
        <div className="bg-white p-3 rounded-2xl border">
          <input
            type="text"
            value={tagInput}
            placeholder="Type tag & press Enter"
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagKeyDown}
            className="w-full outline-none"
          />

          <div className="flex flex-wrap gap-2 mt-3">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="bg-blue-500 text-white px-3 py-1 rounded-full flex items-center gap-2"
              >
                {tag}
                <button type="button" onClick={() => removeTag(i)}>
                  <IoClose />
                </button>
              </span>
            ))}
          </div>
        </div>

        <input
          type="url"
          name="imageURL"
          placeholder="Image URL"
          onChange={handleChange}
          className="w-full border p-3 bg-white rounded-2xl"
          required
        />

        <input
          type="number"
          name="estimatedBudget"
          placeholder="Estimated Budget"
          onChange={handleChange}
          className="w-full border p-3 bg-white rounded-2xl"
        />

        <input
          type="text"
          name="targetAudience"
          placeholder="Target Audience"
          onChange={handleChange}
          className="w-full border p-3 bg-white rounded-2xl"
          required
        />

        <textarea
          name="problemStatement"
          placeholder="Problem Statement"
          onChange={handleChange}
          className="w-full border p-3 h-24 bg-white rounded-2xl"
          required
        />

        <textarea
          name="proposedSolution"
          placeholder="Proposed Solution"
          onChange={handleChange}
          className="w-full border p-3 h-24 bg-white rounded-2xl"
          required
        />

        <Button
          type="submit"
          disabled={loading}
          className="w-full py-6 bg-lime-500 text-blue-600 text-xl rounded-full flex items-center justify-center"
        >
          {loading ? "Submitting..." : "Submit"}
          <IoIosArrowRoundForward />
        </Button>

      </form>

      <Toaster />
    </div>
  );
};

export default AddIdea;