import Note from "../models/Note.js";

export async function getAllNotes(req, res) {
  try {
    const notes = await Note.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    console.error("error occured", error);
    res.status(500).json({ message: "internal server error" });
  }
}

export async function getNoteById(req, res) {
  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.user._id });
    if (!note) return res.status(404).json({ message: "Not found !" });
    res.json(note);
  } catch (error) {
    console.error("error has occured", error);
    res.status(500).json({ message: "internal server error" });
  }
}

export async function createNote(req, res) {
  try {
    const { title, content } = req.body;
    const note = new Note({ title, content, user: req.user._id });

    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.error("error occured", error);
    res.status(500).json({ message: "internal server error" });
  }
}

export async function updateNote(req, res) {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { title, content },
      { new: true }
    );
    if (!updatedNote) return res.status(404).json({ message: "Not found" });

    res.status(200).json(updatedNote);
  } catch (error) {
    console.error("error occured", error);
    res.status(500).json({ message: "internal server error" });
  }
}

export async function deleteNote(req, res) {
  try {
    const deletedNote = await Note.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!deletedNote) return res.status(404).json({ message: "Not found" });
    res.status(200).json({ message: "note deleted succesfully!" });
  } catch (error) {
    console.error("error has occured", error);
    res.status(500).json({ message: "Internal server error" });
  }
}