const express = require("express");
const router = express.Router();
const dynamicController = require("../controllers/dynamic.controller");

// :tableName — це змінна, яка динамічно підставляє назву таблиці з URL
router.get("/:tableName", dynamicController.getAll);
router.get("/:tableName/:id", dynamicController.getById);
router.post("/:tableName", dynamicController.create);
router.put("/:tableName/:id", dynamicController.update);
router.delete("/:tableName/:id", dynamicController.delete);

module.exports = router;
