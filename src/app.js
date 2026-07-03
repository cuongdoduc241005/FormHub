const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Kiem tra server co hoat dong khong
app.get("/ping", (req, res) => {
  res.status(200).json({ message: ping });
});

module.exports = app;
