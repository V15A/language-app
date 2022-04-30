import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

async function EditWords(content) {
  const conf = {
    method: "PUT",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      english: content.english,
      finnish: content.finnish,
      tag: content.tag,
      id: content.id,
    }),
  };
  console.log(conf);
  try {
    console.log("content", content);
    let res = await fetch("/words/", conf);
    console.log(res.status);
  } catch (err) {
    console.log(err.message);
  }
}

function EditPromt(content) {
  const [open, setOpen] = React.useState(false);
  const [newContent, setNewContent] = React.useState({
    english: content.english,
    finnish: content.finnish,
    tag: content.tag,
    id: content.id,
  });

  const setContent = (e, id) => {
    e.preventDefault();
    if (id === "english") {
      setNewContent({
        finnish: newContent.finnish,
        english: e.target.value,
        tag: newContent.tag,
        id: newContent.id,
      });
    } else if (id === "finnish") {
      setNewContent({
        english: newContent.english,
        finnish: e.target.value,
        tag: newContent.tag,
        id: newContent.id,
      });
    } else if (id === "tag") {
      setNewContent({
        english: newContent.english,
        finnish: newContent.finnish,
        tag: e.target.value,
        id: newContent.id,
      });
    }
  };
  return (
    <div>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Edit
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <h1>Edit word</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            EditWords(newContent);
            setOpen(false);
          }}
        >
          <label>
            English:
            <input
              type="text"
              value={newContent.english}
              onChange={(e) => setContent(e, "english")}
            />
          </label>
          <label>
            Finnish:
            <input
              type="text"
              value={newContent.finnish}
              onChange={(e) => setContent(e, "finnish")}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      </Dialog>
    </div>
  );
}

export default EditPromt;
