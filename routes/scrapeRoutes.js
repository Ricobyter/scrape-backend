const express = require("express");
const { scrapeAndUpdate } = require("../controllers/scrapeController");

const router = express.Router();

router.get("/scrape", scrapeAndUpdate);

module.exports = router;
