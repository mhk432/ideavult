"use client";

import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

import { FaEdit } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";

export default function CommentSection({ ideaId, showInput = true }) {
  const { data: session } = authClient.useSession();

  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);

  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  // ================= FETCH =================
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

    if (!session?.user) {
      return toast.error("Login required");
    }

    const newComment = {
      id: Date.now().toString(),
      text,
      user: {
        name: session.user.name,
        image: session.user.image,
        email: session.user.email,
      },
      createdAt: new Date(),
    };

    // 🔥 Optimistic UI (instant show)
    setComments((prev) => [newComment, ...prev]);

    try {
      setPosting(true);

      const res = await fetch(
        `http://localhost:5000/ideas/${ideaId}/comments`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text,
            user: newComment.user,
          }),
        }
      );

      if (!res.ok) throw new Error();

      toast.success("Comment added");
      e.target.reset();
    } catch (error) {
      toast.error("Failed to add comment");
      fetchComments(); // rollback
    } finally {
      setPosting(false);
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

  // ================= EDIT =================
  const startEdit = (comment) => {
    setEditId(comment.id);
    setEditText(comment.text);
  };

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

          <button
            disabled={posting}
            className="flex items-center gap-2 mt-2 px-6 py-2 bg-green-600 text-white rounded-xl"
          >
            {posting ? "Posting..." : "Post comment"}
            <FiSend />
          </button>
        </form>
      )}

      {/* LIST */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        comments.map((c) => (
          <div key={c.id} className="p-4 border rounded-xl mb-3 bg-gray-50">

            {/* USER */}
            <div className="flex justify-between items-start">

  {/* LEFT SIDE - USER */}
  <div className="flex items-center gap-3">
    <Image
      width={40}
      height={40}
      src={c.user?.image || "/user.png"}
      className="rounded-full object-cover"
      alt="user"
    />

    <div>
      <p className="font-semibold">
        {c.user?.name || "Anonymous"}
      </p>

      <p className="text-xs text-gray-500">
        {c.user?.email}
      </p>
    </div>
  </div>

  {/* RIGHT SIDE - TIME + ACTIONS */}
  <div className="flex flex-col items-end gap-1">

    {/* TIME */}
    <span className="text-xs text-gray-400">
      {c.createdAt
        ? new Date(c.createdAt).toLocaleString()
        : "Just now"}
    </span>

    {/* ACTIONS */}
    <div className="flex gap-3 text-lg">
      <button
        onClick={() => startEdit(c)}
        className="text-blue-600 flex items-center gap-1"
      >
        <FaEdit /> Edit
      </button>

      <button
        onClick={() => handleDelete(c.id)}
        className="text-red-600 flex items-center gap-1"
      >
        <MdDelete /> Delete
      </button>
    </div>

  </div>

</div>

            {/* EDIT */}
            {editId === c.id ? (
              <div className="mt-3">
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