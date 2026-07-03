const express = require("express");
const router = express.Router();
const FormController = require("../controllers/form.controller");

router.get("/", FormController.getAll);
router.post("/", FormController.create);
router.get("/:formId", FormController.getById);
router.put("/:formId", FormController.update);
router.delete("/:formId", FormController.delete);

module.exports = router;
