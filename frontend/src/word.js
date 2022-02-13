import React, { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import DeleteWord from "./deleteWord";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  Paper,
} from "@mui/material";

/**
 * A component that validates user quess with given finnish word and adds correct answers to parents counter.
 *
 * @param {*} props should include parent score adding function and finnish word to compare with the quess.
 * @returns textfield element in which the user will insert their quess.
 */
function WordQuessElement(props) {
  const [correct, setCorrect] = useState(0);
  const [quess, setQuess] = useState("");
  const [inputErr, setInputErr] = useState(false);

  useEffect(() => {
    return handleQuess();
  }, [quess]);

  const handleQuess = () => {
    if (quess.toLowerCase() === props.finnish.toLowerCase() && !correct) {
      props.addCorrect(true);
      setCorrect(true);
    } else if (quess.toLowerCase() !== props.finnish.toLowerCase() && correct) {
      props.addCorrect(false);
      setCorrect(false);
      console.log(correct);
    }
  };

  const handleChange = (event) => {
    if (event.target.value.trim().match(/^[a-zA-ZÀ-ÖØ-öø-ÿ]+$/)) {
      setQuess(event.target.value.trim());
      setInputErr(false);
    } else {
      setInputErr(true);
      console.log("Error: only letters allowed");
    }
  };

  return (
    <TextField
      error={inputErr}
      id="outlined-basic"
      label="Finnish"
      variant="outlined"
      onChange={handleChange}
    />
  );
}

export default WordTable;

/**
 * A component that returns a table with words and quessfields or full word pairs with possibility to delete them.
 *
 * @param {*} props includes user role and tag for words that user wants to see.
 * @returns table of words matchin the given tag.
 */
function WordTable(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [correct, setCorrect] = useState(0);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    async function FetchData() {
      try {
        let res = await fetch("/words/" + props.tag);
        const json = await res.json();
        setData(json);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    }

    FetchData();
    setCorrect(0);
  }, [props.tag, update]);

  const addCorrect = (yes) => {
    if (yes) {
      setCorrect(correct + 1);
    } else if (!yes && correct > 0) {
      setCorrect(correct - 1);
    }
  };

  const handleUpdate = () => {
    setUpdate(!update);
  };

  if (isLoading) {
    return <h1>LOADING...</h1>;
  } else if (!isLoading && props.user === "user") {
    return (
      <div>
        <TableContainer
          component={Paper}
          sx={{
            margin: "auto",
            marginTop: "10px",
            width: "80%",
            maxWidth: "600px",
          }}
        >
          <Table sx={{ maxWidth: 600 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>English</TableCell>
                <TableCell align="right">Finnish</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow
                  id={row.id}
                  key={row.id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell align="left">{row.english}</TableCell>
                  <TableCell align="right">
                    <WordQuessElement {...row} addCorrect={addCorrect} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button
          variant="contained"
          sx={{ marginTop: "7px" }}
          onClick={() => alert(`${correct}/${data.length} correct!`)}
        >
          Check
        </Button>
      </div>
    );
  } else if (!isLoading && props.user === "admin") {
    return (
      <TableContainer
        component={Paper}
        sx={{
          margin: "auto",
          marginTop: "10px",
          width: "80%",
          maxWidth: "550px",
        }}
      >
        <Table sx={{ maxWidth: 550 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">English</TableCell>
              <TableCell align="center">Finnish</TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow
                id={row.id}
                key={row.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell align="center">{row.english}</TableCell>
                <TableCell align="center">{row.finnish}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    onClick={() =>
                      DeleteWord({ update: handleUpdate, id: row.id })
                    }
                  >
                    Delete
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Button variant="disabled" /*onClick={promptEdit}*/>
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}
