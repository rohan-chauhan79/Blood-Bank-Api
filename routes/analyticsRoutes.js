const express = require("express");
const authMiddelware = require("../middlewares/authMiddleware");
const {
  bloodGroupDetailsController,
} = require("../controllers/analyticsController");

const router = express.Router();

// get Blood Data
router.get("/bloodGroups-data", authMiddelware, bloodGroupDetailsController);

module.exports = router;
