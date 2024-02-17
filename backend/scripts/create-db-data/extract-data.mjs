import { chromium } from 'playwright';
import path from 'path';
import { generateRandInt, toNumber, sleep } from './helper.mjs';

async function getProductImageSrcs(page) {
  const imagesSrc = [];
  const altImageThumbnails = await page.locator('#altImages > ul > li.imageThumbnail.item').all();

  await Promise.all(
    altImageThumbnails.map(async (el) => {
      try {
        await el.click({ timeout: 5000 });
      } catch (error) {
        console.log('catch error', error);
      }
    }),
  );

  const altImages = await page.locator('#main-image-container ul > li.image.item img').all();

  imagesSrc.push(
    ...(await Promise.all(
      altImages.map(async (el) => {
        return await el.getAttribute('src');
      }),
    )),
  );

  return imagesSrc;
}

async function getProductPrice(page) {
  let fraction, whole;
  const priceBlock = await page.locator('#apex_desktop_qualifiedBuybox').all();
  if (priceBlock.length > 0) {
    whole = await (await page.locator('#apex_desktop_qualifiedBuybox .a-price-whole')).innerText();
    fraction = await (
      await page.locator('#apex_desktop_qualifiedBuybox .a-price-fraction')
    ).innerText();
  } else {
    const priceBlock2 = await page.locator('.priceToPay').all();
    if (priceBlock2.length > 0) {
      whole = await (await page.locator('.priceToPay .a-price-whole').all())[0].innerText();
      fraction = await (await page.locator('.priceToPay .a-price-fraction').all())[0].innerText();
    }
  }

  return toNumber(`${whole}${fraction}`);
}

async function getProductRate(page) {
  const value = toNumber(
    await (
      await page.locator('#centerCol #averageCustomerReviews #acrPopover .a-size-base')
    ).innerText(),
  );
  const votes = toNumber(
    await (await page.locator('#centerCol #acrCustomerReviewText')).innerText(),
    false,
  );

  return { value, votes };
}

async function getProductTag(page) {
  const tagLink = await await page.locator('.ac-keyword-link').all();
  if (tagLink.length > 0) {
    return await tagLink[0].innerText();
  }
  return null;
}

async function getProductCaracteristics(page) {
  const caracteristicsList = await page.locator('#feature-bullets li span').all();
  return await Promise.all(
    caracteristicsList.map(async (el) => {
      return await el.innerText();
    }),
  );
}

async function getLongDescription(page) {
  const descriptionAsText = await page.locator('#productDescription p').all();
  if (descriptionAsText.length > 0) {
    return await descriptionAsText[0].innerHTML();
  }
  return 'Description manquante';
}

async function getBrand(page) {
  const brandText = await (await page.locator('#bylineInfo')).innerText();
  return brandText.split(' ').pop();
}

async function getProductsRef(page, url) {
  try {
    await page.goto(url);
    const dataAsinlocatorList = await page.locator('.s-result-list > div').all();

    return (
      await Promise.all(
        dataAsinlocatorList.map(async (el) => {
          const dataAsin = await el.getAttribute('data-asin');
          if (!dataAsin) {
            return null;
          }

          const href = await el.locator('.s-product-image-container a').getAttribute('href');
          return { href, dataAsin };
        }),
      )
    ).filter((el) => el !== null);
  } catch (error) {
    console.log(error);
    throw new Error('Error while getting products ref', { url, error });
  }
}

async function getName(page) {
  return await (await page.locator('#title span').all())?.[0]?.innerText();
}

async function getProductDetails(page, url, ctx) {
  try {
    await page.goto(url);
    const name = await getName(page);
    const imagesSrc = await getProductImageSrcs(page);
    const price = await getProductPrice(page);
    const rate = await getProductRate(page);
    const tags = [await getProductTag(page), ...ctx.tags].filter((el) => el !== null);
    const caracteristics = await getProductCaracteristics(page);
    const longDescription = await getLongDescription(page);
    const brand = await getBrand(page);
    const technicalDescription = {};
    const sku = generateRandInt(0, 500);

    return {
      name,
      imagesSrc,
      price,
      rate,
      tags,
      sku,
      brand,
      caracteristics,
      technicalDescription,
      longDescription,
    };
  } catch (error) {
    console.log('Error while getting product details', { url, error });
  }
}

export async function extractData(url, ctx) {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  const productsRef = await getProductsRef(page, url);
  const productsData = [];
  for (const ref of productsRef.slice(-1)) {
    await sleep(3000);
    console.log(ref.href);
    productsData.push(await getProductDetails(page, path.join(ctx.baseUrl, ref.href), ctx));
  }
  browser.close();

  productsData.filter((el) => {
    const hasImageSrc = Array.isArray(el.imagesSrc) && el.imagesSrc.length > 0;
    if (!hasImageSrc) {
      console.warn('product invalid, no image found', { el });
    }
    return hasImageSrc;
  });
  return productsData;
}
