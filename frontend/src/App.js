import "./App.css";
import React, { useState } from "react";

function App() {
  const [data, setData] = useState([]);

  async function FetchData() {
    let res = await fetch("http://localhost:3050/test");
    const json = await res.json();
    console.log(json);
    return json;
  }

  setData(FetchData());
  return (
    <div className="App">
      <p>{data[1].english}</p>
    </div>
  );
}

export default App;
