'use client';

export default function NoteCard({ note, onDelete, onEdit }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <h3 className="font-bold text-yellow-500 text-xl mb-2">{note.title}</h3>
      <p className="text-gray-900 mb-4 whitespace-pre-wrap">{note.content}</p>
      <div className="flex justify-end space-x-2">
        <button
          onClick={() => onEdit(note)}
          className="bg-yellow-500 text-white px-3 py-1 rounded text-sm"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(note._id)}
          className="bg-red-500 text-white px-3 py-1 rounded text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
