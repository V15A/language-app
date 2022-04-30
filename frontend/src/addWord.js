import React, { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";

/**
 * A component that returns 3 textfields and submit button to add new words to db.
 *
 * @returns
 */
function AddWord() {
  const [finnish, setFinnish] = useState("");
  const [english, setEnglish] = useState("");
  const [tag, setTag] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    /**
     * A function to enable and disable submit button depending on the content of @tag @finnish and @english
     */
    const submitConditions = () => {
      if (
        tag.trim().length > 1 &&
        tag.trim().match(/^[a-zA-Z/]+$/) &&
        finnish.trim().length > 1 &&
        finnish.trim().match(/^[a-zA-ZÀ-ÖØ-öø-ÿ]+$/) &&
        english.trim().length > 1 &&
        english.trim().match(/^[a-zA-Z]+$/)
      ) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    };

    submitConditions();

    return;
  }, [finnish, english, tag]);

  const handleFinChange = (event) => {
    setFinnish(event.target.value);
  };

  const handleEngChange = (event) => {
    setEnglish(event.target.value);
  };

  const handleTagChange = (event) => {
    setTag(event.target.value);
  };

  /**
   * Async function that posts wordpair with tag to database.
   */
  const add = async () => {
    const conf = {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ english, finnish, tag }),
    };

    try {
      setIsSending(true);
      let res = await fetch("/words/add", conf);

      setIsSending(false);
    } catch (err) {
      setIsSending(false);
      console.log("err.message");
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
        <Button
          disabled={disabled}
          variant="contained"
          sx={{ marginTop: "7px" }}
          onClick={add}
        >
          Add Word
        </Button>
      </div>
    );
  }
}

export default AddWord;
