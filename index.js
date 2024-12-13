import express from "express";
// getting external library ref
const app = express();

app.get("/", (req, res) => {
  //check for user id
  // take this id and check in db
  // get results from db
  // send results as response
  res.json({ message: "hello world" });
});
app.get("/health", (req, res) => {
  res.json({ message: "application is working fine" });
});

app.get("/sai", (req, res) => {
  res.json({ message: "hello this is Sai" });
});

app.get("/api/:username", (req, res) => {
  const username = req.params.username;
  res.json({ username });
});
app.listen(3000, () => {
  console.log(`server is running at 3000`);
});
