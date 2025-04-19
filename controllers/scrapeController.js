const Event = require("../models/eventModel");
const Notice = require("../models/noticeModel");
const Achievement = require("../models/achievementModel");
const { scrapeData } = require("../utils/scrapeUtils");

const scrapeAndUpdate = async (req, res) => {
  try {
    const eventData = await scrapeData("mCSB_2_container");
    console.log("🟢 Event Data:", eventData);
    const noticeData = await scrapeData("mCSB_3_container");
    const achievementData = await scrapeData("mCSB_1_container");

    await updateCollection(Event, eventData);
    await updateCollection(Notice, noticeData);
    await updateCollection(Achievement, achievementData);

    res.json({ message: "Scraped and updated successfully!" });
  } catch (err) {
    console.error("Scraping failed:", err);
    res.status(500).json({ error: "Scraping failed" });
  }
};

// Helper function to update database collections
const updateCollection = async (Model, newData) => {
  const existingData = await Model.find();
  const existingTitles = existingData.map(item => item.title);

  for (const item of newData) {
    if (!existingTitles.includes(item.title)) {
      await Model.create(item);
    }
  }

  for (const item of existingData) {
    if (!newData.some(newItem => newItem.title === item.title)) {
      await Model.findByIdAndDelete(item._id);
    }
  }
};

module.exports = { scrapeAndUpdate };
