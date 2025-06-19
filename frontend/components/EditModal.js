'use client';
import { useState, useEffect } from 'react';

export default function EditModal({ note, onClose, onSave }) {
  const [editedNote, setEditedNote] = useState({
    title: '',
    content: ''
  });

  useEffect(() => {
    if (note) {
      setEditedNote({
        title: note.title,
        content: note.content
      });
    }
  }, [note]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!editedNote.title.trim() || !editedNote.content.trim()) {
      alert('Please fill in both title and content');
      return;
    }
    onSave(editedNote);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center border-b p-4">
          <h2 className="text-xl font-semibold">Edit Note</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
            aria-label="Close"
          >
            &times;
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              id="title"
              type="text"
              placeholder="Note title"
              value={editedNote.title}
              onChange={(e) => setEditedNote({...editedNote, title: e.target.value})}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            <textarea
              id="content"
              placeholder="Note content"
              value={editedNote.content}
              onChange={(e) => setEditedNote({...editedNote, content: e.target.value})}
              className="w-full p-2 border rounded h-32 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          
          <div className="flex justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
