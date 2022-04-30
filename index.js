const express = require("express");
const path = require("path");

const db = require("./db.js");
const port = process.env.PORT || 8080;

/**
 * Express application that has necessary functions for getting data from database.
 */
const app = express();
app.use(express.json());

app.use(express.static(path.join(__dirname, "frontend/build")));

app.get("/words", async (req, res) => {
  try {
    let data = await db.findAll();
    res.send(data);
    console.log(data);
  } catch (err) {
    console.log(err);
  }
});

app.get("/words/:tag([a-z]+)", async (req, res) => {
  try {
    console.log("getting words with tag: " + req.params.tag);
    let data = await db.findByTag(req.params.tag);
    res.send(data);
  } catch (err) {
    res.status(403).send("Invalid arguments");
    console.log(err.message);
  }
});

app.put("/words/", async (req, res) => {
  try {
    let data = await db.editById(req.body);
    res.send(data);
  } catch (err) {
    res.status(403).send("Invalid arguments");
    console.log(err.message);
  }
});

app.post("/words/add", async (req, res) => {
  try {
    console.log("adding");
    let data = await db.save(req.body);
    res.send(data);
  } catch (err) {
    res.status(403).send("Invalid arguments");
    console.log(err.message);
  }
});

app.delete("/words/delete/:idVar([0-9]+)", async (req, res) => {
  try {
    console.log("deleting");
    let data = await db.deleteById(req.params.idVar);
    res.send(data);
  } catch (err) {
    res.status(404).send("Could not delete, make sure id is valid");
    console.log(err.message);
  }
});

app.use("*", express.static(path.join(__dirname, "frontend/build")));

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
