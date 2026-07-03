const express = require("express");
const cors = require("cors");
const formRoutes = require("./routes/form.routes");
const fieldRoutes = require("./routes/field.routes");

const app = express();

app.use(cors());
app.use(express.json());

// Đăng ký API routes
app.use("/api/forms", formRoutes);
app.use("/api/forms", fieldRoutes);

app.get("/ping", (req, res) => {
  res.status(200).json({ message: "pong" });
});

module.exports = app;
