import { useState, useEffect } from 'react';
import axios from "axios"
import { useNavigate } from "react-router-dom";


const App = () => {

  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("")


  function fetchNotes() {
    axios.get("https://backend-cohort-tkci.onrender.com/api/notes")
      .then((res) => {
        setNotes(res.data.notes)
      });
  }

  useEffect(() => {
    fetchNotes();
  }, [])

  function submitHandler(e) {
    e.preventDefault();

    axios.post("https://backend-cohort-tkci.onrender.com/api/notes", {
      title: title,
      description: description
    })
      .then((res) => {
        console.log(res.data);
        fetchNotes();
      });


    setTitle("");
    setDescription("");
  };

  function handleDeleteNote(noteId) {
    axios.delete("https://backend-cohort-tkci.onrender.com/api/notes/" + noteId)
      .then((res) => {
        console.log(res.data);
        fetchNotes();
      });
  };

  function handleUpdateNoteDesc(noteId) {
    console.log(noteId);
    const noewDescription = prompt("Enter noew description");

    axios.patch("https://backend-cohort-tkci.onrender.com//api/notes/" + noteId, {
      description: noewDescription
    })
      .then((res) => {
        console.log(res.data);
        fetchNotes();
        console.log(res.data);
      });
  };

  return (
    <>
      <h1>Create Note</h1>

      <form className='note-create-form' onSubmit={submitHandler} >
        <input type="text" placeholder='Enter title'
          value={title} onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <input type="text" placeholder='Enter description'
          value={description} onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <button type='submit' >Create note</button>
      </form>

      <div className="notes">
        {
          notes.map((note, idx) => {
            return <div key={idx} className="note">
              <h1>{note.title}</h1>
              <p>{note.description}</p>
              <div className="btns">
                <button
                  onClick={() => {
                    handleDeleteNote(note._id)
                  }}
                >
                  Delete note
                </button>
                <button
                  onClick={() => {
                    handleUpdateNoteDesc(note._id)
                  }}
                >
                  update note's description
                </button>
              </div>
            </div>
          })
        }
      </div>
    </>
  )
}

export default App