const express = require("express");
const cors = require("cors");
const formRoutes = require("./routes/form_routes");
const fieldRoutes = require("./routes/field_routes");
const submissionRoutes = require("./routes/submission_routes");

const app = express();

app.use(cors());
app.use(express.json());

// API Form
app.use("/api/forms", formRoutes);

// API Field
app.use("/api/forms", fieldRoutes);

// API Submission
app.use("/api/submissions", submissionRoutes);

app.get("/ping", (req, res) => {
  res.status(200).json({ message: "pong" });
});

module.exports = app;
