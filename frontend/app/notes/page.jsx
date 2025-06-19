'use client';
import { useState, useEffect } from 'react';
import { getNotes, createNote, updateNote, deleteNote } from '@/lib/api';
import NoteForm from '@/components/NoteForm';
import NoteCard from '@/components/NoteCard';
import EditModal from '@/components/EditModal';

export default function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all notes
  const fetchNotes = async () => {
    setIsLoading(true);
    try {
      const data = await getNotes();
      setNotes(data);
    } catch (err) {
      setError('Failed to fetch notes');
      console.error('Fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Create new note
  const handleCreateNote = async (newNote) => {
    try {
      await createNote(newNote);
      await fetchNotes(); // Refresh the list
    } catch (err) {
      setError('Failed to create note');
      console.error('Create error:', err);
    }
  };

  // Update existing note
  const handleUpdateNote = async (updatedNote) => {
    try {
      await updateNote(editingNote._id, updatedNote);
      setShowModal(false);
      await fetchNotes(); // Refresh the list
    } catch (err) {
      setError('Failed to update note');
      console.error('Update error:', err);
    }
  };

  // Delete note
  const handleDeleteNote = async (id) => {
    try {
      await deleteNote(id);
      await fetchNotes(); // Refresh the list
    } catch (err) {
      setError('Failed to delete note');
      console.error('Delete error:', err);
    }
  };

  // Open edit modal
  const handleEditClick = (note) => {
    setEditingNote(note);
    setShowModal(true);
  };

  // Initial data load
  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">My Notes</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <NoteForm onSubmit={handleCreateNote} />

      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : notes.length === 0 ? (
        <p className="text-center text-gray-500 py-8">No notes yet. Create your first note!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.map((note) => (
            <NoteCard
              key={note._id}
              note={note}
              onDelete={handleDeleteNote}
              onEdit={() => handleEditClick(note)}
            />
          ))}
        </div>
      )}

      {showModal && (
        <EditModal
          note={editingNote}
          onClose={() => setShowModal(false)}
          onSave={handleUpdateNote}
        />
      )}
    </div>
  );
}
