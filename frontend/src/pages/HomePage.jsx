import React, { useState, useEffect } from "react";
import RateLimitedUI from "./components/RateLimitedUI";
import toast from "react-hot-toast";
import NoteCard from "./components/NoteCard";
import NotesNotFound from "./components/NotesNotFound";
import api from "../lib/axios";
import { useAuth } from "../context/AuthContext";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchNotes = async () => {
      if (!user) {
        setNotes([]);
        setLoading(false);
        return;
      }

      try {
        const res = await api.get("/notes");
        setNotes(res.data);
        setIsRateLimited(false);
      } catch (error) {
        console.log("Error fetching notes:", error);

        if (error.response?.status === 429) {
          setIsRateLimited(true);
        } else if (error.response?.status !== 401) {
          toast.error("failed to load notes");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [user]);

  return (
    <div>
      {isRateLimited && <RateLimitedUI />}

      <div className="max-q-7xl mx-auto p-4 mt-6">
        {loading && (
          <div className="text-center text-fuchsia-300 py-10">Loading Notes ...</div>
        )}

        {!loading && notes.length === 0 && !isRateLimited && <NotesNotFound />}

        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-white ml-10">
            {notes.map((note) => (
              <div key={note._id}>
                <NoteCard note={note} setNotes={setNotes} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;