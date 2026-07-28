import React from "react";
import { useNavigate } from "react-router";
import { PlusIcon, LogOutIcon } from "lucide-react";
import { useAuth } from "./context/AuthContext";

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleAddNoteClick = () => {
    if (!user) {
      navigate("/auth", { state: { from: "/create" } });
    } else {
      navigate("/create");
    }
  };

  return (
    <header className="flex items-center justify-between border-b border-gray-500 bg-transparent p-8">
      <h1 className="text-2xl font-bold text-white ml-3">THINK-BOARD</h1>

      <div className="flex items-center gap-5">
        <button
          onClick={handleAddNoteClick}
          className="py-3 px-8 rounded-xl text-white bg-fuchsia-950/80 backdrop-blur-sm flex items-center gap-2 hover:bg-fuchsia-900 transition-colors"
        >
          <PlusIcon className="w-5 h-5" />
          <span>Add Note</span>
        </button>

        {user && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-fuchsia-700 flex items-center justify-center text-white font-semibold uppercase">
              {user.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt={user.username}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                user.username?.charAt(0)
              )}
            </div>
            <span className="text-white hidden sm:block">{user.username}</span>
            <button
              onClick={logout}
              className="text-gray-400 hover:text-white transition"
              title="Log out"
            >
              <LogOutIcon className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;