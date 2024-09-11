const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { getDonarsListController, getHospitalListController, getOgrListController, deleteDonarController } = require("../controllers/adminController");
const adminMiddleware = require("../middlewares/adminMiddleware");

//router Object
const router = express.Router();

//Routes

//Get || Donar List
router.get("/donar-list", authMiddleware,adminMiddleware, getDonarsListController);

//Get || Hospital List
router.get("/hospital-list", authMiddleware,adminMiddleware, getHospitalListController);

//Get || Org List
router.get("/org-list", authMiddleware,adminMiddleware, getOgrListController);

//=====================================

//Delete donar || GET
router.delete('/delete-donar/:id', authMiddleware, adminMiddleware,deleteDonarController)

//export
module.exports = router;
