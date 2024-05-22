const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  getDonarsListController,
  getHospitalListController,
  getOrgsListController,
} = require("../controllers/adminController");
const adminMiddleware = require("../middlewares/adminMiddleware");
const router = express.Router();
router.delete(
  "/delete-donar/:id",
  authMiddleware,
  adminMiddleware,
  getDonarsListController
);
router.get(
  "/donar-list",
  authMiddleware,
  adminMiddleware,
  getDonarsListController
);
router.get(
  "/hospital-list",
  authMiddleware,
  adminMiddleware,
  getHospitalListController
);
router.get(
  "/orgs-list",
  authMiddleware,
  adminMiddleware,
  getOrgsListController
);
module.exports = router;
