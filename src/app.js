const express = require("express");
const cors = require("cors");
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const formRoutes = require("./routes/form.routes");
const fieldRoutes = require("./routes/field.routes");
const submissionRoutes = require("./routes/submission.routes");
const swaggerDocument = YAML.load(path.join(__dirname, "../swagger.yaml"));

const app = express();

app.use(cors());
app.use(express.json());

// API Form
app.use("/api/forms", formRoutes);

// API Field
app.use("/api/forms", fieldRoutes);

// API Submission
app.use("/api/submissions", submissionRoutes);

// API Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/ping", (req, res) => {
  res.status(200).json({ message: "pong" });
});

module.exports = app;
