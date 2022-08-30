import prisma from './prisma-client.mjs';
import { readFile } from 'fs/promises';
import path from 'path';
import * as url from 'url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

faker.seed(123);

await prisma.tag.createMany({
  data: [
    {
      name: 'mode',
    },
    {
      name: 'informatique',
    },
    {
      name: 'decoration',
    },
  ],
  skipDuplicates: true,
});

const tags = await prisma.tag.findMany({});

const genRandInt = (min, max) => {
  return Math.round(Math.random() * (max - min) + min);
};

const genRandDecimal = (min, max, nbDecimals = 2) => {
  return parseFloat((Math.random() * (max - min) + min).toFixed(nbDecimals), 10);
};
