const express = require("express");

const port = 3000;
const app = express();

app.get("/test", (req, res) => {
  res.send("Test yeh.");
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
