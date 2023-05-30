import mergeImg from 'merge-img';
import config from '../config.js';
const { width } = config;

// Function to merge two images
export const mergeImages = async (firstBody, secondBody) => {
  return new Promise((resolve, reject) => {
    // Creating objects with image data and positions for merging
    const firstImg = { src: Buffer.from(firstBody, 'binary'), x: 0, y: 0 };
    const secondImg = { src: Buffer.from(secondBody, 'binary'), x: width, y: 0 };

    // Merging the images using the mergeImg module
    mergeImg([firstImg, secondImg])
      .then((img) => {
        // Converting the merged image to a buffer
        img.getBuffer('image/jpeg', (error, buffer) => {
          if (error) {
            reject(error);
          } else {
            resolve(buffer);
          }
        });
      })
      .catch((error) => {
        reject(error);
      });
  });
};
