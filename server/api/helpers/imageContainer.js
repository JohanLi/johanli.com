/* prevents reflow of responsive images */

import sizeOf from 'image-size';
import path from 'path';

import filePaths from './filepaths';

const imgRegexp = /<img src="([\s\S]*?)"([\s\S]*?)>/g;

const imageContainer = (entries, pathToImages = filePaths.img) => {
  entries.forEach((entry) => {
    let match;

    while (match = imgRegexp.exec(entry.html)) {
      const { width, height } = sizeOf(path.join(pathToImages, match[1]));
      const paddingBottom = (height / width) * 100;

      const lengthBefore = entry.html.length;

      entry.html = `${entry.html.substring(0, match.index)}
        <div class="imageContainer" style="width: ${width}px;">
          <div style="padding-bottom: ${paddingBottom}%">
            ${match[0]}
          </div>
        </div>
        ${entry.html.substring(match.index + match[0].length)}`;

      const lastIndexOffset = entry.html.length - lengthBefore;
      imgRegexp.lastIndex += lastIndexOffset;
    }
  });
  return entries;
};

export default imageContainer;
