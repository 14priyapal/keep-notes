import mongoose from "mongoose";
import Note from "../models/note.model.js";

export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({}).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: notes });
  } catch (error) {
    console.error("Error fetching notes:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const createNote = async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({
      success: false,
      message: "Please provide both title and content",
    });
  }

  try {
    const newNote = await Note.create({ title, content });
    res.status(201).json({ success: true, data: newNote });
  } catch (error) {
    console.error("Error creating note:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid note ID" });
  }

  try {
    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { title, content },
      { new: true, runValidators: true }
    );
    res.status(200).json({ success: true, data: updatedNote });
  } catch (error) {
    console.error("Error updating note:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const deleteNote = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid note ID" });
  }

  try {
    await Note.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "Note deleted successfully" });
  } catch (error) {
    console.error("Error deleting note:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
