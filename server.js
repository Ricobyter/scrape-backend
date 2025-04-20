const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const scrapeRoutes = require("./routes/scrapeRoutes");
const dataRoutes = require("./routes/dataRoutes");
const { startCronJobs } = require("./utils/cronJobs");
const puppeteer = require("puppeteer");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB();
startCronJobs();

app.use("/api", scrapeRoutes);
app.use("/api/data", dataRoutes);


app.get("/test-puppeteer", async (req, res) => {
    try {
      const browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });
  
      const page = await browser.newPage();
      await page.goto("https://example.com", { waitUntil: "domcontentloaded" });
      const title = await page.title();
  
      await browser.close();
      res.send(`✅ Puppeteer is working! Page title: ${title}`);
    } catch (err) {
      console.error("❌ Puppeteer failed:", err.message);
      res.status(500).send("Puppeteer failed: " + err.message);
    }
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
