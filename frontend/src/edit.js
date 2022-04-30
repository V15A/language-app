import React from "react";
import { Button, Dialog } from "@mui/material";

async function EditWords(content) {
  const conf = {
    method: "PUT",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      english: content.english,
      finnish: content.finnish,
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
    id: content.id,
  });

  const setContent = (e, lang) => {
    e.preventDefault();
    if (lang === "english") {
      setNewContent({
        finnish: newContent.finnish,
        english: e.target.value,
        id: newContent.id,
      });
    } else {
      setNewContent({
        english: newContent.english,
        finnish: e.target.value,
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
