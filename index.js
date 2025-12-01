const express = require("express");
const session = require("express-session");
const path = require("path");
const loginHandler = require("./controllers/loginController");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "views")));

app.use(session({
  secret: "mySecretKey",      // change in production
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 3600000 } // 1 hour
}));

// login API
app.post("/controllers", loginHandler);

// protect dashboard
app.get("/dashboard", (req, res) => {
  if (!req.session.loggedIn) {
    return res.redirect("/views/pages/login/login.html");
  }
  res.sendFile(path.join(__dirname, "/views/pages/dashboard/dashboard.html"));
});

app.listen(PORT, () =>
  console.log(`Server running → http://localhost:${PORT}`)
);