import React from "react";

function Note(props) {
  function handleClick() {
    console.log(`Delete button clicked for note with id: ${props.id}`);
    props.onDelete(props.id);
  }

  function handleEditClick() {
    console.log(`Edit button clicked for note with id: ${props.id}`);
    props.onEdit(props.id);
  }

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={handleClick}>DELETE</button>
      <button onClick={handleEditClick}>EDIT</button>
    </div>
  );
}

export default Note;
