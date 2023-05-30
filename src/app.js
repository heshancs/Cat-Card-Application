import fs from 'fs';
import path from 'path';
import axios from 'axios';
import config from './config.js';
import { mergeImages } from './utils/mergeImages.js';

const {
  greeting,
  who,
  width,
  height,
  color,
  size
} = config;

async function fetchImage(url) {
  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch image from ${url}: ${error.message}`);
  }
}

async function saveImageToFile(buffer, filePath) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, buffer, 'binary', (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

async function generateCatCard() {
  const firstUrl = `https://cataas.com/cat/says/${encodeURIComponent(greeting)}?width=${width}&height=${height}&color=${encodeURIComponent(color)}&s=${size}`;
  const secondUrl = `https://cataas.com/cat/says/${encodeURIComponent(who)}?width=${width}&height=${height}&color=${encodeURIComponent(color)}&s=${size}`;

  try {
    const [firstBody, secondBody] = await Promise.all([
      fetchImage(firstUrl),
      fetchImage(secondUrl)
    ]);

    const buffer = await mergeImages(firstBody, secondBody);

    const filePath = path.join(process.cwd(), 'dist', 'cat-card.jpg');
    await saveImageToFile(buffer, filePath);
  } catch (error) {
    console.error('An error occurred while generating the cat card:', error);
  }
}

generateCatCard()
  .then(() => {
    console.log('The cat card was generated and saved successfully!');
  })
  .catch((error) => {
    console.error('An error occurred while generating the cat card:', error);
  });
