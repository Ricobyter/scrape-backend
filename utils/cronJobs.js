// utils/cronJobs.js
const cron = require("node-cron");
const axios = require("axios");

const SCRAPE_URL = process.env.SCRAPE_URL || "http://localhost:5000/api/scrape";
const startCronJobs = () => {
  console.log("✅ Cron job initialized!"); // <--- Add this

  cron.schedule("0 */2 * * *", async () => {
    console.log("🔁 Running scheduled scraping job...");
    try {
      const res = await axios.get(SCRAPE_URL);
      console.log("✅ Data successfully updated!", res.status);
    } catch (error) {
      console.error("❌ Error in cron job:", error.message);
    }
  });
};

module.exports = { startCronJobs };
