const puppeteer = require("puppeteer");

const scrapeData = async (divId) => {
  let browser;
  try {
    console.log("🚀 Launching Puppeteer...");
    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    console.log("🌐 Navigating to IIITDMJ...");
    await page.goto("https://www.iiitdmj.ac.in/", {
      waitUntil: "load",
      timeout: 60000, // give 60s timeout
    });

    // OPTIONAL: Wait for the div to appear
    await page.waitForSelector(`#${divId}`, { timeout: 10000 });
    console.log(`✅ Found #${divId} on page`);

    const result = await page.evaluate((divId) => {
      try {
        const container = document.getElementById(divId);
        if (!container) {
          console.log("⚠️ Container not found in evaluate()");
          return [];
        }

        const items = new Map();
        const divs = container.querySelectorAll("div");

        divs.forEach((div) => {
          const titleElement = div.querySelector("h3");
          const dateElement = div.querySelector("small");
          const linkElement = div.querySelector("a");

          if (titleElement && linkElement) {
            const key = `${titleElement.innerText.trim()}|${
              dateElement?.innerText.trim() || ""
            }|${linkElement.href}`;
            if (!items.has(key)) {
              items.set(key, {
                title: titleElement.innerText.trim(),
                date: dateElement?.innerText.trim() || null,
                link: linkElement.href,
              });
            }
          }
        });

        console.log("✅ Evaluation complete, items:", items.size);
        return Array.from(items.values());
      } catch (innerErr) {
        console.log("❌ Error inside evaluate:", innerErr);
        return [];
      }
    }, divId);

    console.log("🎯 Scrape result length:", result.length);
    return result;
  } catch (err) {
    console.error("❌ scrapeData failed:", err.message);
    throw err;
  } finally {
    if (browser) {
      console.log("🧹 Closing Puppeteer browser");
      await browser.close();
    }
  }
};

module.exports = { scrapeData };
