import React, { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";

function AddWord() {
  const [finnish, setFinnish] = useState("");
  const [english, setEnglish] = useState("");
  const [tag, setTag] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleFinChange = (event) => {
    setFinnish(event.target.value);
  };

  const handleEngChange = (event) => {
    setEnglish(event.target.value);
  };

  const handleTagChange = (event) => {
    setTag(event.target.value);
  };

  const add = async () => {
    const conf = {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ english, finnish, tag }),
    };
    console.log(conf);
    try {
      setIsSending(true);
      let res = await fetch("http://localhost:3050/words/add", conf);
      const json = await res.json();
      console.log(json);
      setIsSending(false);
    } catch (err) {
      setIsSending(false);
      console.log(err);
    }
  };
  if (isSending) {
    return (
      <div>
        <h2>Sending...</h2>
      </div>
    );
  } else {
    return (
      <div>
        <TextField
          id="outlined-basic"
          label="Finnish"
          variant="outlined"
          onChange={handleFinChange}
        />
        <br />
        <TextField
          id="outlined-basic"
          label="English"
          variant="outlined"
          sx={{ marginTop: "7px" }}
          onChange={handleEngChange}
        />
        <br />
        <TextField
          id="outlined-basic"
          label="Tag"
          variant="outlined"
          sx={{ marginTop: "7px" }}
          onChange={handleTagChange}
        />
        <br />
        <Button variant="contained" sx={{ marginTop: "7px" }} onClick={add}>
          Add Word
        </Button>
      </div>
    );
  }
}

export default AddWord;
