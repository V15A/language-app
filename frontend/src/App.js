import "./App.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

function App() {
  return (
    <div className="App">
      <h1>Log in to start learning!</h1>
      <h2>
        App for learning languages. Currently supports only english to finnish.
      </h2>
      <Button variant="contained">
        <Link to="/user">User</Link>
      </Button>{" "}
      <Button variant="contained">
        <Link to="/admin">Admin</Link>
      </Button>
    </div>
  );
}

export default App;
