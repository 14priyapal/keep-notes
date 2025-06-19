"use client";
import { useState } from "react";

export default function NoteForm({ noteData, onSubmit }) {
  const [note, setNote] = useState(noteData || { title: "", content: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!note.title.trim() || !note.content.trim()) {
      alert("Please fill in both title and content");
      return;
    }
    onSubmit(note);
    if (!noteData) setNote({ title: "", content: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 p-4 bg-gray-800 rounded-lg shadow">
      <input
        type="text"
        placeholder="Note Title"
        value={note.title}
        onChange={(e) => setNote({ ...note, title: e.target.value })}
        className="w-full p-2 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <textarea
        placeholder="Note Content"
        value={note.content}
        onChange={(e) => setNote({ ...note, content: e.target.value })}
        className="w-full p-2 mb-3 border rounded h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition duration-200"
      >
        {noteData ? "Update Note" : "Add Note"}
      </button>
    </form>
  );
}
