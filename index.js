const express = require("express");

const db = require("./db.js");
const port = 3050;
const app = express();
app.use(express.json());

app.use(express.static("frontend/build"));

app.get("/words", async (req, res) => {
  let data = await db.findAll();
  res.send(data);
  console.log(data);
});

app.get("/words/:tag([a-z]+)", async (req, res) => {
  try {
    console.log("getting words with tag: " + req.params.tag);
    let data = await db.findByTag(req.params.tag);
    res.send(data);
  } catch (err) {
    console.log(err.message);
  }
});

app.post("/words/add", async (req, res) => {
  try {
    console.log("adding");
    let data = await db.save(req.body);
    res.send(data);
  } catch (err) {
    console.log(err.message);
  }
});

app.delete("/words/delete?/:idVar([0-9]+)", async (req, res) => {
  try {
    console.log("deleting");
    let data = await db.delete(req.params.idVar);
    res.send(data);
  } catch (err) {
    console.log(err.message);
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
