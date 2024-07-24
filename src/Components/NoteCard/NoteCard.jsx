import React from "react";

export default function NoteCard({
  title,
  setCurrentEditing,
  index,
  deleteNote,
  isSelected,
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        padding: "10px",
        backgroundColor: isSelected ? "#E0F7FA" : "",
        cursor: "pointer",
      }}
      onClick={() => setCurrentEditing(index)}
    >
      <h2 style={{ flex: 1 }}>{title.substr(0, 20)}....</h2>
      <button
        style={{
          width: "25px",
          height: "25px",
          backgroundColor: "#37474F",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
        onClick={(e) => {
          e.stopPropagation();
          deleteNote(index);
        }}
      >
        -
      </button>
    </div>
  );
}