import { NotebookIcon } from "lucide-react";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext"; // adjust path to match your folder structure

const NotesNotFound = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleCreateClick = () => {
    if (!user) {
      navigate("/auth", { state: { from: "/create" } });
    } else {
      navigate("/create");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center text-center max-w-lg mx-auto py-24 px-6">
      <div className="w-24 h-24 rounded-full bg-fuchsia-950/30 border border-fuchsia-800 flex items-center justify-center mb-6">
        <NotebookIcon className="w-12 h-12 text-fuchsia-400" />
      </div>

      <h2 className="text-3xl font-bold text-white mb-3">
        No Notes Yet
      </h2>

      <p className="text-gray-400 leading-relaxed mb-8">
        Ready to organize your thoughts? Create your first note and start
        building your personal Think Board.
      </p>

      <button
        onClick={handleCreateClick}
        className="px-6 py-3 rounded-xl bg-fuchsia-900 hover:bg-fuchsia-800 text-white font-medium transition-all duration-200 hover:scale-105"
      >
        Create Your First Note
      </button>
    </div>
  );
};

export default NotesNotFound;