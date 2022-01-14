import React, { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  Paper,
} from "@mui/material";

function WordQuessElement(props) {
  const [correct, setCorrect] = useState(0);
  const [quess, setQuess] = useState("");
  const [inputErr, setInputErr] = useState(false);

  useEffect(() => {
    return handleQuess();
  }, [quess]);

  const handleQuess = () => {
    if (quess.toLowerCase() === props.finnish && !correct) {
      props.addCorrect(true);
      setCorrect(true);
    } else if (quess.toLowerCase() !== props.finnish && correct) {
      props.addCorrect(false);
      setCorrect(false);
      console.log(correct);
    }
  };

  const handleChange = (event) => {
    if (event.target.value.trim().match(/^[a-zA-Z]+$/)) {
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

function WordTable(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [correct, setCorrect] = useState(0);

  useEffect(() => {
    async function FetchData() {
      try {
        let res = await fetch("http://localhost:3050/words/" + props.tag);
        const json = await res.json();
        //console.log(json);
        setData(json);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    FetchData();
    setCorrect(0);
  }, [props.tag]);

  const addCorrect = (bool) => {
    if (bool) {
      setCorrect(correct + 1);
    } else if (!bool && correct > 0) {
      setCorrect(correct - 1);
    }
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
                  <Button variant="contained" /*onClick={promptDelete}*/>
                    Delete
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Button variant="contained" /*onClick={promptEdit}*/>
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
