import "./App.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <h1>Log in to start learning!</h1>
      <h2>
        App for learning languages. Currently supports only english to finnish.
      </h2>
      <button>
        <Link to="/user">User</Link>
      </button>{" "}
      <button>
        <Link to="/admin">Admin</Link>
      </button>
    </div>
  );
}

export default App;
