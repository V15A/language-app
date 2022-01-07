import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function FetchData() {
      try {
        let res = await fetch("http://localhost:3050/test");
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
    return <div>Loading...</div>;
  } else {
    return (
      <div className="App">
        <h1>FRONTEND FRONT PAGE</h1>
        <form onSubmit={() => {}}>
          <span>{data[1].english} </span>
          <input placeholder="in finnish"></input>{" "}
          <button onClick={() => {}}>Submit</button>
          <br />
          <span>{data[0].english} </span>
          <input placeholder="in finnish"></input>{" "}
          <button onClick={() => {}}>Submit</button>
        </form>
      </div>
    );
  }
}

export default App;
