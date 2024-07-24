import { useState, useEffect } from "react";
import NoteCard from "./Components/NoteCard/NoteCard";
import "./App.css";
import MarkdownEditor from "@uiw/react-markdown-editor";

function App() {
  const [notes, setNotes] = useState([]);
  const [currentEditing, setCurrentEditing] = useState(null);

  // Load notes from localStorage on component mount
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(savedNotes);
    if (savedNotes.length > 0) {
      setCurrentEditing(0);
    }
  }, []);

  // Add a new note
  const addNote = () => {
    const newNote = {
      title: "# Enter your title",
      desc: "",
    };
    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    setCurrentEditing(notes.length); // Set the newly created note as the current editing note
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  // Delete a note
  const deleteNote = (index) => {
    let newArray = notes.filter((item, ind) => ind !== index);
    setNotes(newArray);
    localStorage.setItem("notes", JSON.stringify(newArray));
    if (newArray.length === 0) {
      setCurrentEditing(null);
    } else if (index === currentEditing) {
      setCurrentEditing(newArray.length - 1);
    } else if (index < currentEditing) {
      setCurrentEditing(currentEditing - 1);
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {notes.length === 0 ? (
        <div style={{ display: "flex", flex: 1, justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
          <h1>You have no notes</h1>
          <button onClick={addNote} style={{ backgroundColor: "#006064", color: "white", padding: "10px 15px", border: "none", cursor: "pointer" }}>
            Add Notes
          </button>
        </div>
      ) : (
        <>
          <div style={{ width: "25%", borderRight: "1px solid #ddd", padding: "10px", overflowY: "auto" }}>
            <button onClick={addNote} style={{ width: "100%", backgroundColor: "#006064", color: "white", padding: "10px", border: "1px solid grey", cursor: "pointer", marginBottom: "10px" }}>
              Add Notes
            </button>
            {notes.map((item, index) => (
              <NoteCard
                key={index}
                title={item.title}
                setCurrentEditing={setCurrentEditing}
                index={index}
                deleteNote={deleteNote}
                isSelected={currentEditing === index}
              />
            ))}
          </div>
          <div style={{ flex: 1, padding: "10px" }}>
            {currentEditing !== null ? (
              <MarkdownEditor
                height="calc(100vh - 20px)"
                onChange={(value) => {
                  let localCopy = [...notes];
                  localCopy[currentEditing].desc = value;
                  localCopy[currentEditing].title = value.split("\n")[0] || "Untitled";
                  setNotes(localCopy);
                  localStorage.setItem("notes", JSON.stringify(localCopy));
                }}
                value={notes[currentEditing].desc}
              />
            ) : (
              <p>Please select a note to edit</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default App;