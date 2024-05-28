import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header";
import Note from "./components/Note";
import NotesArea from "./components/NotesArea";

function App() {
  const [notes, setNotes] = useState([]);
  const [editingNoteId, setEditingNoteId] = useState(null); // Track the note being edited
  const [editFormData, setEditFormData] = useState({
    title: "",
    content: ""
  });

  useEffect(() => {
    // Fetch notes from backend on component mount
    fetchNotes();
  }, []);

  function fetchNotes() {
    axios.get('https://notes-takings-3.onrender.com/api/notes')
      .then(response => {
        setNotes(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the notes!", error);
      });
  }

  function addNote(newNote) {
    setNotes(prevNotes => [...prevNotes, newNote]);
  }

  function deleteNote(id) {
    axios.delete(`https://notes-takings-3.onrender.com/${id}`)
      .then(response => {
        console.log('Delete response:', response.data);
        setNotes(prevNotes => prevNotes.filter(noteItem => noteItem._id !== id));
      })
      .catch(error => {
        console.error("There was an error deleting the note!", error);
      });
  }

  function handleEdit(id) {
    const noteToEdit = notes.find(note => note._id === id);
    setEditingNoteId(id);
    setEditFormData({
      title: noteToEdit.title,
      content: noteToEdit.content
    });
  }

  function handleEditChange(event) {
    const { name, value } = event.target;
    setEditFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  }

  function handleEditSubmit(event) {
    event.preventDefault();
    axios.put(`https://notes-takings-3.onrender.com/api/notes/${editingNoteId}`, {
      title: editFormData.title,
      content: editFormData.content
    })
    .then(response => {
      console.log('Edit response:', response.data);
      setNotes(prevNotes => {
        return prevNotes.map(noteItem => {
          if (noteItem._id === editingNoteId) {
            return {
              ...noteItem,
              title: editFormData.title,
              content: editFormData.content
            };
          } else {
            return noteItem;
          }
        });
      });
      setEditingNoteId(null);
      setEditFormData({
        title: "",
        content: ""
      });
    })
    .catch(error => {
      console.error("There was an error editing the note!", error);
    });
  }

  return (
    <div>
      <Header />
      <NotesArea onAdd={addNote} />
      {notes.map(noteItem => (
        <div key={noteItem._id}>
          {editingNoteId === noteItem._id ? (
            <form onSubmit={handleEditSubmit}>
              <input
                type="text"
                placeholder="Title"
                name="title"
                value={editFormData.title}
                onChange={handleEditChange}
                required
              />
              <textarea
                placeholder="Content"
                name="content"
                value={editFormData.content}
                onChange={handleEditChange}
                required
              />
              <button type="submit">Update</button>
            </form>
          ) : (
            <Note
              id={noteItem._id}
              title={noteItem.title}
              content={noteItem.content}
              onDelete={deleteNote}
              onEdit={handleEdit}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default App;
