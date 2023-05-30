// Importing required modules
import fs from 'fs';
import path from 'path';
import axios from 'axios';
import config from './config.js';
import { mergeImages } from './utils/mergeImages.js';

// Extracting required variables from the configuration
const { baseUrl, greeting, who, width, height, color, size } = config;

// Function to fetch an image from a given URL
const fetchImage = async (url) => {
  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch image from ${url}: ${error.message}`);
  }
};

// Function to save an image buffer to a file
const saveImageToFile = async (buffer, filePath) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, buffer, 'binary', (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
};

// Function to generate a cat card by merging two images
const generateCatCard = async () => {
  // Constructing URLs for the cat images with specified parameters
  const firstUrl = `${baseUrl}/cat/says/${encodeURIComponent(
    greeting
  )}?width=${width}&height=${height}&color=${encodeURIComponent(
    color
  )}&s=${size}`;
  const secondUrl = `${baseUrl}/cat/says/${encodeURIComponent(
    who
  )}?width=${width}&height=${height}&color=${encodeURIComponent(
    color
  )}&s=${size}`;

  try {
    // Fetching the images asynchronously
    const [firstBody, secondBody] = await Promise.all([
      fetchImage(firstUrl),
      fetchImage(secondUrl),
    ]);

    // Merging the images
    const buffer = await mergeImages(firstBody, secondBody);

    // Constructing the file path for the cat card image
    const filePath = path.join(process.cwd(), 'dist', 'cat-card.jpg');

    // Saving the merged image buffer to a file
    await saveImageToFile(buffer, filePath);
  } catch (error) {
    console.error('An error occurred while generating the cat card:', error);
  }
};

// Generating the cat card and handling success/error cases
generateCatCard()
  .then(() => {
    console.log('The cat card was generated and saved successfully!');
  })
  .catch((error) => {
    console.error('An error occurred while generating the cat card:', error);
  });
