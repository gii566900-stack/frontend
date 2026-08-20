const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();
const API_URL = process.env.API_URL || "http://api:80";
const PORT = process.env.PORT || 80;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/health", (req, res) => res.json({ status: "ok", service: "backend" }));

app.get("/", async (req, res) => {
  try {
    const { data: news } = await axios.get(`${API_URL}/news`);
    res.render("index", { news });
  } catch (err) {
    res.render("index", { news: [] });
  }
});

app.get("/about", (req, res) => res.render("about"));

app.get("/staff", (req, res) => res.render("staff"));

app.get("/contact", (req, res) => res.render("contact"));

app.listen(PORT, () => console.log(`Backend service listening on port ${PORT}`));
