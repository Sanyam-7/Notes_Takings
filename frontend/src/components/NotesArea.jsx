// frontend/src/components/NotesArea.js

import React, { useState } from "react";
import axios from "axios";

function NotesArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function submitNote(event) {
    axios.post('http://localhost:5000/api/notes', note)
      .then(response => {
        props.onAdd(response.data);
        setNote({
          title: "",
          content: ""
        });
      })
      .catch(error => {
        console.error("There was an error creating the note!", error);
      });
    event.preventDefault();
  }

  return (
    <div>
      <form>
        <input
          name="title"
          onChange={handleChange}
          value={note.title}
          placeholder="Title"
        />
        <textarea
          name="content"
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows="3"
        />
        <button onClick={submitNote}>Add</button>
      </form>
    </div>
  );
}

export default NotesArea;
