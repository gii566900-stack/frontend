const express = require("express");
const cors = require("cors");
const newsRoutes = require("./routes/news");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => res.json({ status: "ok", service: "api" }));
app.use("/news", newsRoutes);

const PORT = process.env.PORT || 80;
app.listen(PORT, () => console.log(`API service listening on port ${PORT}`));
