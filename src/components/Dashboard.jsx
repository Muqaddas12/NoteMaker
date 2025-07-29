import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import topLogo from "../assets/dashboard-logo.png";

const Dashboard = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);         // ⏳ user is null initially
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);   // ✅ loading state
  const [creating, setCreating] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [noteInput, setNoteInput] = useState({ title: "", content: "" });

  useEffect(() => {
    const storedUser =
      JSON.parse(localStorage.getItem("user")) ||
      JSON.parse(sessionStorage.getItem("user"));

    if (!storedUser) {
      navigate("/signin");
    } else {
      setUser(storedUser);
    }

    setLoading(false); // ✅ stop loading after check
  }, [navigate]);

  const storageKey = `notes_${user?.email}`;

  useEffect(() => {
    if (user) {
      const stored = JSON.parse(localStorage.getItem(storageKey)) || [];
      setNotes(stored);
    }
  }, [user, storageKey]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(storageKey, JSON.stringify(notes));
    }
  }, [notes, storageKey, user]);

  const handleAddOrEdit = () => {
    if (!noteInput.title.trim() || !noteInput.content.trim()) return;

    const updatedNotes = [...notes];
    if (editingIndex !== null) {
      updatedNotes[editingIndex] = noteInput;
    } else {
      updatedNotes.push(noteInput);
    }

    setNotes(updatedNotes);
    setNoteInput({ title: "", content: "" });
    setCreating(false);
    setEditingIndex(null);
  };

  const handleDelete = (index) => {
    const updated = notes.filter((_, i) => i !== index);
    setNotes(updated);
  };

  const handleEdit = (index) => {
    setNoteInput(notes[index]);
    setCreating(true);
    setEditingIndex(index);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    navigate("/signin");
  };

  // ⏳ Don't render if still checking auth
  if (loading || !user) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col px-4 py-6 md:px-10 lg:px-24">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-5">
          <img src={topLogo} alt="Logo" className="w-8 h-6" />
          <span className="text-lg font-semibold">Dashboard</span>
        </div>
        <button
          onClick={handleLogout}
          className="text-blue-600 text-sm hover:underline"
        >
          Sign Out
        </button>
      </div>

      {/* Welcome */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6 w-full max-w-3xl">
        <h2 className="text-lg font-semibold">Welcome, {user.name}</h2>
        <p className="text-sm text-gray-600">Email: {user.email}</p>
      </div>

      {/* Note Form */}
      <div className="w-full max-w-3xl mb-6">
        {!creating ? (
          <button
            onClick={() => {
              setCreating(true);
              setEditingIndex(null);
              setNoteInput({ title: "", content: "" });
            }}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Create Note
          </button>
        ) : (
          <div className="bg-white p-4 rounded-md shadow space-y-4">
            <input
              type="text"
              value={noteInput.title}
              onChange={(e) =>
                setNoteInput({ ...noteInput, title: e.target.value })
              }
              placeholder="Note Title"
              className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none"
            />
            <textarea
              value={noteInput.content}
              onChange={(e) =>
                setNoteInput({ ...noteInput, content: e.target.value })
              }
              placeholder="Note Content"
              rows="4"
              className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none"
            ></textarea>
            <div className="flex justify-end gap-3">
              <button
                onClick={handleAddOrEdit}
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700"
              >
                {editingIndex !== null ? "Update" : "Save"}
              </button>
              <button
                onClick={() => {
                  setCreating(false);
                  setNoteInput({ title: "", content: "" });
                  setEditingIndex(null);
                }}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Notes List */}
      <div className="w-full max-w-3xl">
        <h3 className="text-base font-semibold mb-2">Your Notes</h3>
        {notes.length === 0 ? (
          <p className="text-sm text-gray-500">No notes yet.</p>
        ) : (
          <div className="grid gap-4">
            {notes.map((note, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 p-4 rounded-md shadow-sm"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-sm mb-1">{note.title}</h4>
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">
                      {note.content}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(index)}
                      className="text-blue-600 text-sm hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="text-red-500 text-sm hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
