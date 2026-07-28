import express from "express";
import { createNote, deleteNote, getAllNotes, updateNote, getNoteById } from "../controllers/notesController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.use(authMiddleware); // every route below requires a valid logged-in user

router.get("/", getAllNotes);
router.get("/:id", getNoteById);
router.post("/", createNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;