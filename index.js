const express = require("express");

const db = require("./db.js");
const port = 3050;
const app = express();
app.use(express.json());

app.use(express.static("frontend/build"));

app.get("/", async (req, res) => {
  let data = await db.findAll();
  res.send(data);
  console.log(data);
});

app.post("/add", async (req, res) => {
  try {
    console.log("adding");
    let data = await db.save(req.body);
    res.send(data);
  } catch (err) {
    console.log(err.message);
  }
});

app.delete("/delete?/:idVar([0-9]+)", async (req, res) => {
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
