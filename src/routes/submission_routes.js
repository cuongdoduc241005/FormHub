const express = require("express");
const router = express.Router();

const SubmissionController = require("../controllers/submission.controller");

// Lấy danh sách tất cả submission
router.get("/", SubmissionController.getAll);

module.exports = router;
