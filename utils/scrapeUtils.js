const puppeteer = require("puppeteer");

const scrapeData = async (divId) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://www.iiitdmj.ac.in/", { waitUntil: "load" });

  const result = await page.evaluate((divId) => {
    const container = document.getElementById(divId);
    if (!container) return [];

    const items = new Map();
    const divs = container.querySelectorAll("div");

    divs.forEach(div => {
      const titleElement = div.querySelector("h3");
      const dateElement = div.querySelector("small");
      const linkElement = div.querySelector("a");

      if (titleElement && linkElement) {
        const key = `${titleElement.innerText.trim()}|${dateElement?.innerText.trim() || ''}|${linkElement.href}`;
        if (!items.has(key)) {
          items.set(key, {
            title: titleElement.innerText.trim(),
            date: dateElement?.innerText.trim() || null,
            link: linkElement.href
          });
        }
      }
    });

    return Array.from(items.values());
  }, divId);

  await browser.close();
  return result;
};

module.exports = { scrapeData };
