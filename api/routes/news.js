const express = require("express");
const router = express.Router();
const pool = require("../db");

// GET /news - list all
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT id, title, summary, voltage_tag, created_at FROM news ORDER BY created_at DESC"
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /news/:id - single item
router.get("/:id", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM news WHERE id = ?", [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: "ไม่พบข่าว" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /news - create
router.post("/", async (req, res) => {
  const { title, summary, body, voltage_tag } = req.body;
  if (!title || !summary) return res.status(400).json({ error: "ต้องระบุ title และ summary" });
  try {
    const [result] = await pool.query(
      "INSERT INTO news (title, summary, body, voltage_tag) VALUES (?, ?, ?, ?)",
      [title, summary, body || "", voltage_tag || "22kV"]
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /news/:id - update
router.put("/:id", async (req, res) => {
  const { title, summary, body, voltage_tag } = req.body;
  try {
    await pool.query(
      "UPDATE news SET title = ?, summary = ?, body = ?, voltage_tag = ? WHERE id = ?",
      [title, summary, body, voltage_tag, req.params.id]
    );
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /news/:id
router.delete("/:id", async (req, res) => {
  try {
    await pool.query("DELETE FROM news WHERE id = ?", [req.params.id]);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
