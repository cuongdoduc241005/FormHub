const express = require("express");
const router = express.Router();
const FormController = require("../controllers/form.controller");

router.get("/", FormController.getAll);
router.post("/", FormController.create);
router.get("/:id", FormController.getById);
router.put("/:id", FormController.update);
router.delete("/:id", FormController.delete);

module.exports = router;
