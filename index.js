const express = require("express");
const path = require("path");
const loginHandler = require("./api/login_handler"); // if you already made this

const app = express();
const PORT = 3000;

// parse JSON bodies
app.use(express.json());

// serve static files from /public
app.use(express.static(path.join(__dirname, "public")));

// when user goes to "/", send login.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

// login API
app.post("/api/login", loginHandler); // or put handler inline if you prefer

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
