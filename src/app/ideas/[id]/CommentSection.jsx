"use client";

import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

// ⭐ icons
import { FaEdit } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

export default function CommentSection({ ideaId, showInput = true }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  const fetchComments = async () => {
    if (!ideaId) return;

    try {
      const res = await fetch(
        `http://localhost:5000/ideas/${ideaId}/comments`
      );
      const data = await res.json();
      setComments(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [ideaId]);

  // ================= POST =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    const text = e.target.comment.value.trim();
    if (!text) return;

    const res = await fetch(
      `http://localhost:5000/ideas/${ideaId}/comments`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      }
    );

    if (res.ok) {
      toast.success("Comment added");
      e.target.reset();
      fetchComments();
    }
  };

  // ================= DELETE =================
  const handleDelete = async (commentId) => {
    const res = await fetch(
      `http://localhost:5000/ideas/${ideaId}/comments/${commentId}`,
      {
        method: "DELETE",
      }
    );

    if (res.ok) {
      toast.success("Deleted");
      fetchComments();
    }
  };

  // ================= EDIT START =================
  const startEdit = (comment) => {
    setEditId(comment.id);
    setEditText(comment.text);
  };

  // ================= SAVE EDIT =================
  const handleEditSave = async () => {
    const res = await fetch(
      `http://localhost:5000/ideas/${ideaId}/comments/${editId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: editText }),
      }
    );

    if (res.ok) {
      toast.success("Updated");
      setEditId(null);
      setEditText("");
      fetchComments();
    }
  };

  return (
    <div>
      <Toaster />

      <h3 className="text-2xl font-semibold mb-5">
        💬 Comments ({comments.length})
      </h3>

      {/* INPUT */}
      {showInput && (
        <form onSubmit={handleSubmit} className="mb-6">
          <textarea
            name="comment"
            className="w-full p-4 border rounded-xl"
            placeholder="Write comment..."
          />
          <button className="flex mt-2 px-6 py-2 bg-green-600 text-white rounded-xl">
            Post comment<FiSend />
          </button>
        </form>
      )}

      {/* LIST */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        comments.map((c) => (
          <div
            key={c.id}
            className="p-4 border rounded-xl mb-3 bg-gray-50"
          >
            {/* header */}
            <div className="flex justify-between items-center">
              <b>{c.author || "Anonymous"}</b>

              {/* ICON BUTTONS */}
              <div className="flex gap-3 text-lg">
                
                {/* EDIT ICON */}
                <button
                  onClick={() => startEdit(c)}
                  className="text-blue-600 hover:scale-110 transition flex"
                >
                  <FaEdit /> <p className="text-sm">Edit</p>
                </button>

                {/* DELETE ICON */}
                <button
                  onClick={() => handleDelete(c.id)}
                  className="text-red-600 hover:scale-110 transition flex "
                >
                  <MdDelete /><p className="text-sm ">Delete</p>
                </button>

              </div>
            </div>

            {/* EDIT MODE */}
            {editId === c.id ? (
              <div className="mt-2">
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="border p-2 w-full rounded"
                />

                <button
                  onClick={handleEditSave}
                  className="mt-2 bg-blue-600 text-white px-4 py-1 rounded"
                >
                  Save
                </button>
              </div>
            ) : (
              <p className="mt-2">{c.text}</p>
            )}
          </div>
        ))
      )}
    </div>
  );
}