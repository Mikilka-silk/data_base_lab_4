const express = require("express");
const router = express.Router();
const teamController = require("../controllers/team.controller");

router.get("/", teamController.getAll);
router.get("/:id/drivers", teamController.getDrivers); // M:1 endpoint
router.get("/:id/sponsors", teamController.getSponsors); // M:M endpoint

router.post("/", teamController.create);
router.put("/:id", teamController.update);
router.delete("/:id", teamController.delete);

// ЛАБКА 5

router.post("/lab5/sponsors", teamController.createSponsor);

router.post("/lab5/sponsorships", teamController.createSponsorship);

router.post("/lab5/sponsors/generate", teamController.generateTestSponsors);

router.get("/lab5/max-salary", teamController.getMaxSalary);

router.post("/lab5/split-drivers", teamController.splitDrivers);

module.exports = router;
