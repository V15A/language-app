import "./App.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

/**
 * A component that allows choosing a page between user and admin.
 *
 * @returns short intro to app and user and admin buttons.
 */
function App() {
  return (
    <div className="App">
      <h1>Log in to start learning!</h1>
      <h2>
        App for learning languages. Currently supports only english to finnish.
      </h2>
      <Button variant="contained">
        <Link style={{ textDecoration: "none", color: "white" }} to="/user">
          User
        </Link>
      </Button>{" "}
      <Button variant="contained">
        <Link style={{ textDecoration: "none", color: "white" }} to="/admin">
          Admin
        </Link>
      </Button>
    </div>
  );
}

export default App;
