import "./App.css";
import React, { useState, useEffect } from "react";
import WordList from "./word";
import AddWord from "./addWord";

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function FetchData() {
      try {
        let res = await fetch("http://localhost:3050/words");
        const json = await res.json();
        console.log(json);
        setData(json);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    FetchData();
  }, []);

  if (isLoading) {
    return <h1 className="App">Loading...</h1>;
  } else {
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
}

export default App;
