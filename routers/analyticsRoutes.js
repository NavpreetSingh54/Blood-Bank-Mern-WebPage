const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { bloodGroupDetails } = require("../controllers/analyticsController");
const router = express.Router();
router.get("/bloodGroup-data", authMiddleware, bloodGroupDetails);
module.exports = router;
