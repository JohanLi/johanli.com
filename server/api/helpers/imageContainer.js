/* prevents reflow of responsive images */

const sizeOf = require('image-size');
const path = require('path');

const filePaths = require('./filepaths');

const imgRegexp = /<img src="([\s\S]*?)"([\s\S]*?)>/g;

module.exports = (entries, pathToImages = filePaths.img) => {
  entries.forEach((entry) => {
    let match;

    while (match = imgRegexp.exec(entry.html)) {
      const { width, height } = sizeOf(path.join(pathToImages, match[1]));
      const paddingBottom = (height / width) * 100;

      const lengthBefore = entry.html.length;

      entry.html = `${entry.html.substring(0, match.index)}
        <div class="image-container" style="width: ${width}px;">
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
