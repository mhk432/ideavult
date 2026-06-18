'use client';

import { authClient } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiEdit } from "react-icons/fi";

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
      setImage(session.user.image || "");
    }
  }, [session]);

  // update profile
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await authClient.updateUser({
        name,
        image,
      });

      toast.success("Profile updated successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update profile!");
    } finally {
      setLoading(false);
    }
  };

  // loading state
  if (isPending) {
    return (
           <span className="loading loading-bars my-10 loading-xl mx-auto text-center text-red-500"></span>

    );
  }

  // not logged in
  if (!session?.user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Please login first
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-5 py-12">

      <div className="bg-white shadow-xl rounded-3xl overflow-hidden">

        {/* header */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 h-32"></div>

        {/* profile section */}
        <div className="px-8 pb-10 -mt-16">

          {/* image */}
          <div className="flex flex-col items-center">
            <Image
              src={image || "/user.png"}
              width={100}
              height={100}
              alt="profile"
              className="rounded-full border-4 border-white shadow-lg"
            />

            <h1 className="text-xl font-bold mt-3">
              {name}
            </h1>

            <p className="text-gray-500">
              {session.user.email}
            </p>
          </div>

          {/* form */}
          <form onSubmit={handleUpdate} className="mt-8 space-y-5">

            {/* name */}
            <div>
              <label className="font-medium">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border p-3 rounded-xl mt-2"
                placeholder="Enter your name"
              />
            </div>

            {/* image */}
            <div>
              <label className="font-medium">Photo URL</label>
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full border p-3 rounded-xl mt-2"
                placeholder="Enter image URL"
              />
            </div>

           
            {/* button */}
            <Button
              type="submit"
              disabled={loading}
              className="mt-5 mb-5 w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-semibold"
            ><FiEdit />
              {loading ? "Updating..." : "Edit Profile"}
            </Button>

          </form>

        </div>
      </div>
    </div>
  );
}