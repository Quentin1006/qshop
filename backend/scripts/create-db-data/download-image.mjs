import path from 'path';
import fs from 'fs/promises';
import fetch from 'node-fetch';

import { createDir, getDirname, sleep } from './helper.mjs';

const downloadSrc = async (url) => {
  const resp = await fetch(url);
  return await resp.buffer();
};

const storeImage = async (buffer, { outDir, name, group = '' }) => {
  const __dirname = getDirname();
  await createDir(path.resolve(__dirname, outDir, group));
  await fs.writeFile(path.resolve(__dirname, outDir, group, name), buffer);
};

export const downloadImage = async (url, { outDir, group }) => {
  await sleep(1000);
  const name = url.split('/').pop();
  const bufferImage = await downloadSrc(url);
  await storeImage(bufferImage, { outDir, name, group });
};
