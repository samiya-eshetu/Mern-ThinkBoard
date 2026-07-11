import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon, SaveIcon } from "lucide-react";

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.error("Error fetching note:", error);
        toast.error("Failed to fetch note");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Delete Note?",
      text: "This action cannot be undone.",
      icon: "warning",

      background: "#16111f",
      color: "#ffffff",

      showCancelButton: true,

      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",

      confirmButtonColor: "#86198f",
      cancelButtonColor: "#374151",

      reverseButtons: true,

      customClass: {
        popup: "rounded-2xl",
        confirmButton: "rounded-xl px-5 py-2",
        cancelButton: "rounded-xl px-5 py-2",
      },
    });

    // User pressed cancel
    if (!result.isConfirmed) return;

    try {
      await api.delete(`/notes/${id}`);

      toast.success("Note deleted successfully!");

      navigate("/");
    } catch (error) {
      console.error("Error deleting note:", error);

      if (error.response?.status === 429) {
        toast.error("Slow down! Too many requests 💀");
      } else {
        toast.error("Failed to delete note");
      }
    }
  };

  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Title and content are required.");
      return;
    }

    setSaving(true);

    try {
      await api.put(`/notes/${id}`, {
        title: note.title,
        content: note.content,
      });

      toast.success("Note updated successfully!");

      navigate("/");
    } catch (error) {
      console.error("Error updating note:", error);

      if (error.response?.status === 429) {
        toast.error("Slow down! Too many requests 💀");
      } else {
        toast.error("Failed to update note");
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoaderIcon className="size-10 animate-spin text-purple-500" />
      </div>
    );
  }

  if (!note) {
    return null;
  }

  return (
    <div className="min-h-screen text-white">
      <div className="max-w-3xl mx-auto px-4 pt-10">
        {/* Top Navigation */}
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/"
            className="flex items-center gap-2 text-white hover:text-purple-400 transition"
          >
            <ArrowLeftIcon className="size-5" />
            Back To Notes
          </Link>

          <button
            onClick={handleDelete}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-red-900 bg-red-950/40 hover:bg-red-900 transition"
          >
            <Trash2Icon className="size-4" />
            Delete
          </button>
        </div>

        {/* Card */}
        <div className="border border-gray-700 rounded-2xl bg-[#16111f]/80 backdrop-blur-sm p-6">
          <h2 className="text-2xl font-semibold mb-8">Edit Note</h2>

          {/* Title */}
          <div className="flex flex-col gap-2 mb-6">
            <label className="font-semibold">Title</label>

            <input
              type="text"
              value={note.title}
              onChange={(e) =>
                setNote({
                  ...note,
                  title: e.target.value,
                })
              }
              className="w-full rounded-xl border border-gray-600 bg-transparent p-4 outline-none focus:border-purple-500"
            />
          </div>

          {/* Content */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Content</label>

            <textarea
              rows={10}
              value={note.content}
              onChange={(e) =>
                setNote({
                  ...note,
                  content: e.target.value,
                })
              }
              className="w-full rounded-xl border border-gray-600 bg-transparent p-4 outline-none resize-none focus:border-purple-500"
            />
          </div>

          {/* Save Button */}
          <div className="flex justify-end mt-8">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-fuchsia-900 hover:bg-fuchsia-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <>
                  <LoaderIcon className="size-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <SaveIcon className="size-4" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;
