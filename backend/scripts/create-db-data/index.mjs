import crypto from 'crypto';

import path from 'path';
import fs from 'fs/promises';

import { getDirname } from './helper.mjs';
import { extractData } from './extract-data.mjs';
import { downloadImage } from './download-image.mjs';

const fetchDataInCategory = async (category, ctx) => {
  try {
    const url = `${ctx.baseUrl}/s?k=${category}`;
    const data = await extractData(url, ctx);
    return await Promise.all(
      data.map(async (product) => {
        await Promise.all(
          product.imagesSrc.map(async (src) => {
            const group = crypto.createHash('md5').update(product.name).digest('hex');
            await downloadImage(src, { outDir: ctx.outDir, group });
          }),
        );
      }),
    );
  } catch (error) {
    console.log({ category, error });
  }
};

// type ProductsCtx = {
//   tags: string[];
// }
const ctx = {
  tags: ['organisation', 'kitchen-and-home'],
  outDir: path.resolve(getDirname(), '../../../cdn/images'),
  baseUrl: 'https://www.amazon.fr',
  categories: ['rangement', 'high-tech', 'cuisine', 'bricolage', 'jardin'],
};

/**
 *createDir
 * @param {string} url
 * @param {typeof ctx} ctx
 */
const main = async (ctx) => {
  const data = [];
  for (const category of ctx.categories) {
    data.push(...(await fetchDataInCategory(category, ctx)));
  }
  await fs.writeFile('./result.json', JSON.stringify(data), 'utf-8');
};

main(ctx);
