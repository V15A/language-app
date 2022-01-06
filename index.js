const express = require("express");

const db = require("./db.js");
const port = 3050;
const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/test", async (req, res) => {
  let data = await db.findAll();
  res.send(data);
  console.log(data);
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
