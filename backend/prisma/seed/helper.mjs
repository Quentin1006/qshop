import { readdir, readFile } from 'fs/promises';
import path from 'path';
import * as url from 'url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

export const getProducts = async () => {
  const productsFiles = await readdir(path.resolve(__dirname, 'samples'), 'utf-8');

  const allProducts = await Promise.all(
    productsFiles.map(async (file) => {
      return JSON.parse(await readFile(path.resolve(__dirname, 'samples', file)));
    }),
  );
  return allProducts.flat();
};
