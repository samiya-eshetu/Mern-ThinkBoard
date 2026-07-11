import React from "react";
import { useNavigate } from "react-router";
import { PlusIcon } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-between border-b border-gray-500 bg-transparent p-8">
      <h1 className="text-2xl font-bold text-white ml-3">THINK-BOARD</h1>

      <button
        onClick={() => navigate("/create")}
        className="py-3 px-8 rounded-xl text-white bg-fuchsia-950/80 backdrop-blur-sm flex items-center gap-2 hover:bg-fuchsia-900 transition-colors"
      >
        <PlusIcon className="w-5 h-5" />
        <span>Add Note</span>
      </button>
    </header>
  );
};

export default Header;