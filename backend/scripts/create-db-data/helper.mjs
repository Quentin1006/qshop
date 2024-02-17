import url from 'url';
import fs from 'fs/promises';

export const getDirname = () => {
  return url.fileURLToPath(new URL('.', import.meta.url));
};

export const sleep = async (time) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
};

export const createDir = async (dirPath) => {
  try {
    await fs.mkdir(dirPath, { recursive: true });
  } catch (error) {
    console.log('Directory already exists');
  }
};

export function toNumber(str, decimal = true) {
  const val = str.replace(/[^\d.,]/g, '').replace(',', '.');
  return decimal ? parseFloat(val) : parseInt(val);
}
export function generateRandInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
