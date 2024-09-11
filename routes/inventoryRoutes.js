const express = require("express");
const {
  createInventoryController,
  getInventoryController,
  getDonarsController,
  getHospitalController,
  getOrgnaisationController,
  getOrgnaisationForHospitalController,
  getInventoryHospitalController,
  getRecentInventoryController,
} = require("../controllers/inventoryController");
const authMiddelware = require("../middlewares/authMiddleware");
const router = express.Router();

//routes
//add inventory || post
router.post("/create-inventory", authMiddelware, createInventoryController);

// get all blood records
router.get("/get-inventory", authMiddelware, getInventoryController);

// get Recent blood records
router.get("/get-recent-inventory", authMiddelware, getRecentInventoryController);


// get Hospital blood records
router.post("/get-inventory-hospital", authMiddelware, getInventoryHospitalController);


// get all Donar records
router.get("/get-donars", authMiddelware, getDonarsController);

// get Hospital records
router.get("/get-hospitals", authMiddelware, getHospitalController);

// get orgnaisation records
router.get("/get-orgnaisation", authMiddelware, getOrgnaisationController);

// get orgnaisation records
router.get(
  "/get-orgnaisation-for-hospital",
  authMiddelware,
  getOrgnaisationForHospitalController
);

module.exports = router;
