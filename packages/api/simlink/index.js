var puppeteer = require("puppeteer");

async function main(args) {
    if (!args.link) {
        return "No link provided";
    }

    const browser = await puppeteer.launch();

    const page = await browser.newPage();
    await page.goto(args.link);
    await page.setViewport({ width: 1080, height: 1024 });
    const dps_action = ".dps-action";
    await page.waitForSelector(dps_action);
    await page.click(dps_action);
    // await page.waitForTimeout(5000);
    await page.waitForSelector(".results-sim-reference");
    const textSelector = await page.waitForSelector(".results-sim-dps .topline-result-avg");
    const dps = await textSelector?.evaluate((el) => el.textContent);

    await browser.close();
    return dps;
}
