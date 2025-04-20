// utils/cronJobs.js
const cron = require("node-cron");
const axios = require("axios");

const startCronJobs = () => {
  console.log("✅ Cron job initialized!"); // <--- Add this

  cron.schedule("0 */2 * * *", async () => {
    console.log("🔁 Running scheduled scraping job...");
    try {
      const res = await axios.get("https://scrape-backend-3zgq.onrender.com/api/scrape");
      console.log("✅ Data successfully updated!", res.status);
    } catch (error) {
      console.error("❌ Error in cron job:", error.message);
    }
  });
};

module.exports = { startCronJobs };
