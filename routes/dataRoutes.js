const express = require("express");
const router = express.Router();
const {
  getEvents,
  getNotices,
  getAchievements,
} = require("../controllers/dataController");

router.get("/events", getEvents);
router.get("/notices", getNotices);
router.get("/achievements", getAchievements);

module.exports = router;
