const express = require("express");
const router = express.Router();
const teamController = require("../controllers/team.controller");

router.get("/", teamController.getAll);
router.get("/:id/drivers", teamController.getDrivers); // M:1 endpoint
router.get("/:id/sponsors", teamController.getSponsors); // M:M endpoint

router.post("/", teamController.create);
router.put("/:id", teamController.update);
router.delete("/:id", teamController.delete);

module.exports = router;
