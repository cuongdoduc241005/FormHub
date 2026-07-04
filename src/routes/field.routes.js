const express = require("express");
const router = express.Router();
const FieldController = require("../controllers/field.controller");

router.post("/:formId/fields", FieldController.create);
router.put("/:formId/fields/:fieldId", FieldController.update);
router.delete("/:formId/fields/:fieldId", FieldController.delete);

module.exports = router;
