const express = require("express");
const router = express.Router();

const FormController = require("../controllers/form_controller");

// CRUD Form
router.post("/", FormController.create);
router.get("/", FormController.getAll);

// Form dành cho nhân viên SW
router.get("/active", FormController.getActive);

// Chi tiết form
router.get("/:formId", FormController.getById);

// Cập nhật & xóa
router.put("/:formId", FormController.update);
router.delete("/:formId", FormController.delete);

// Submit form
router.post("/:formId/submissions", FormController.submit);

module.exports = router;
