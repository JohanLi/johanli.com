import fs from 'fs';

import '../server/config';
import database from '../server/database';

const getReferencedImages = async () => {
  const images = [];
  const regex = /(?:img src|data-zoom-src)="(.*?)"/gi;

  const [rows] = await database.query('SELECT html FROM blog');

  rows.forEach(({ html }) => {
    let matches;
    while (matches = regex.exec(html)) {
      images.push(matches[1]);
    }
  });

  return images.map(image => image.replace('/img/', ''));
};

const list = async () => {
  const images = fs
    .readdirSync('./public/img')
    .filter(path => path !== 'side-projects');

  const referencedImages = await getReferencedImages();

  const difference = images
    .filter(x => !referencedImages.includes(x))
    .concat(referencedImages.filter(x => !images.includes(x)));

  console.log(difference);
  process.exit();
};

list();
