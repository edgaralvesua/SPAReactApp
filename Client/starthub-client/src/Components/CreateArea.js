import React, { useState } from "react";
import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';
import axious from "axios";

function CreateArea(props) {
  const [note, setNote] = useState({
    tittle: "",
    content: ""
  });

  const[expanded, setExpanded] = useState(false);

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
    const newNote = note;
    axious.post("http://localhost:3000/posts", newNote );
    setNote({
      tittle: "",
      content: ""
    });
    event.preventDefault();
  }

  function expandCreationArea(){
    setExpanded(true);
  }

  return (
    <div>
      <form className="create-note">
        {expanded && <input
          name="tittle"
          onChange={handleChange}
          value={note.tittle}
          placeholder="Title"
        />}
        <textarea
          name="content"
          onChange={handleChange}
          onClick={expandCreationArea}
          value={note.content}
          placeholder="Take a note..."
          rows={expanded ? "3" : "1"}
        />
        <Zoom in={expanded}>
        <Fab onClick={submitNote}>Add</Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;