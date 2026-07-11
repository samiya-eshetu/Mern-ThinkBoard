import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowLeftIcon } from "lucide-react";
import { toast } from "react-hot-toast";
import api from "../lib/axios";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);

    try {
      await api.post("/notes", {
        title,
        content,
      });

      toast.success("Note created successfully!");

      navigate("/");
    } catch (error) {
      console.error("Error creating note:", error);

      if (error.response?.status === 429) {
        toast.error("Slow down! You're creating notes too fast 💀", {
          duration: 4000,
        });
      } else {
        toast.error("Failed to create note! Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
      <Link
        to="/"
        className="flex items-center gap-2 text-white hover:text-purple-400 transition mb-6"
      >
        <ArrowLeftIcon className="size-5" />
        Back To Notes
      </Link>

      <div className="border border-gray-600 rounded-xl bg-[#16111f]/80 backdrop-blur-sm p-6 text-white">
        <h2 className="text-2xl font-semibold mb-6">Create New Note</h2>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2 mb-6">
            <label className="font-semibold">Title</label>

            <input
              type="text"
              placeholder="Note Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="p-4 rounded-xl border border-gray-600 bg-transparent outline-none focus:border-purple-500"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold">Content</label>

            <textarea
              rows={8}
              placeholder="Write your note here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="p-4 rounded-xl border border-gray-600 bg-transparent outline-none focus:border-purple-500 resize-none"
            />
          </div>

          <div className="flex justify-end mt-8">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-xl bg-fuchsia-900 hover:bg-fuchsia-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating..." : "Create Note"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePage;
