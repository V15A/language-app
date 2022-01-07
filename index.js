const express = require("express");

const db = require("./db.js");
const port = 3050;
const app = express();
app.use(express.json());

// for debugging so that react app can access the db
app.use((req, res, next) => {
  res.header({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
  });
  next();
});

app.get("/", async (req, res) => {
  let data = await db.findAll();
  res.send(data);
  console.log(data);
});

app.post("/add", async (req, res) => {
  try {
    let data = await db.save(req.body);
    console.log("adding");
    console.log(req.body);
    res.send(data);
  } catch (err) {
    console.log(err.message);
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
