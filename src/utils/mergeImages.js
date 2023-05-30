import mergeImg from 'merge-img';
import config from '../config.js';

const {
    width
  } = config


export async function mergeImages(firstBody, secondBody) {
    return new Promise((resolve, reject) => {
      const firstImg = { src: Buffer.from(firstBody, 'binary'), x: 0, y: 0 };
      const secondImg = { src: Buffer.from(secondBody, 'binary'), x: width, y: 0 };
  
      mergeImg([firstImg, secondImg])
        .then((img) => {
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
  }