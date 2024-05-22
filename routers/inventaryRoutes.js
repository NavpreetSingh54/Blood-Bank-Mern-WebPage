const express = require("express");
const {
  getInventoryController,
  createInventaryController,
  getDonarsControllers,
  getHospitalControllers,
  getOrganisationControllers,
  getOrganisationForHospitalControllers,
  getInventoryHospitalController,
  getRecentInventoryController,
} = require("../controllers/inventaryController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();
router.post("/create-inventary", authMiddleware, createInventaryController);
router.get("/get-inventary", authMiddleware, getInventoryController);
router.get("/get-donars", authMiddleware, getDonarsControllers);
router.get("/get-hospitals", authMiddleware, getHospitalControllers);
router.get("/get-organisation", authMiddleware, getOrganisationControllers);
router.get("/get-recent-inventary", authMiddleware, getRecentInventoryController);
router.get(
  "/get-organisation-for-hospital",
  authMiddleware,
  getOrganisationForHospitalControllers
);
router.post(
  "/get-inventary-hospital",
  authMiddleware,
  getInventoryHospitalController
);
module.exports = router;
