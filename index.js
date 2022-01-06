const express = require("express");

const db = require("./db.js");
const port = 3000;
const app = express();

app.get("/test", (req, res) => {
  let data = db.findAll();
  res.send(data);
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
