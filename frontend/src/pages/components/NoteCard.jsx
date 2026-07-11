import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import api from "../../lib/axios";

const NoteCard = ({ note, setNotes }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault(); // Prevent Link navigation

    const result = await Swal.fire({
      title: "Delete Note?",
      text: "This action cannot be undone.",
      icon: "warning",

      background: "#16111f",
      color: "#ffffff",

      showCancelButton: true,

      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",

      confirmButtonColor: "#86198f",
      cancelButtonColor: "#374151",

      reverseButtons: true,
    });

    if (!result.isConfirmed) return;

    try {
      await api.delete(`/notes/${id}`);

      setNotes((prev) => prev.filter((note) => note._id !== id));

      toast.success("Note deleted successfully!");
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error("Failed to delete note.");
    }
  };

  return (
    <Link
      to={`/note/${note._id}`}
      className="block p-6 rounded-xl border border-white/10 border-t-4 border-t-fuchsia-950 bg-[#16111f]/80 backdrop-blur-sm hover:shadow-lg hover:shadow-purple-900/20 hover:-translate-y-1 transition-all duration-200"
    >
      <h3 className="text-lg font-bold text-white mb-2">
        {note.title}
      </h3>

      <p className="text-gray-300 line-clamp-3">
        {note.content}
      </p>

      <div className="flex justify-between items-center mt-6">
        <span className="text-sm text-gray-400">
          {new Date(note.createdAt).toLocaleDateString()}
        </span>

        <div className="flex items-center gap-3">
          <PenSquareIcon className="size-4 text-purple-400" />

          <button
            onClick={(e) => handleDelete(e, note._id)}
            className="text-red-400 hover:text-red-300 transition"
          >
            <Trash2Icon className="size-4" />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;