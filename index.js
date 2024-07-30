const express = require("express");
app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/courses", (req, res) => {
  res.send([1, 2, 3]);
});

app.get("/api/courses/:id", (req, res) => {
  res.send(req.params);
  // res.send(req.query);
});

const port = process.env.PORT || 3000; // set PORT=5000 to change port
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
