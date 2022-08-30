import { chromium } from 'playwright';

const browser = await chromium.launch();
const context = await browser.newContext();
const page = await context.newPage();
const url = 'https://www.amazon.fr/gp/bestsellers/ref=zg_mw_tab_bs';

try {
  await page.goto(url);
  const olElements = await page.$$('ol.a-carousel');

  olElements.forEach(async (olEl) => {
    console.log(await olEl.innerHTML());
    const divEl = await olEl.$('li > div');

    const asin = await divEl.getAttribute('data-asin');
    // const divWith
    //console.log({ asin });
  });
} catch (error) {
  console.log(error);
}
