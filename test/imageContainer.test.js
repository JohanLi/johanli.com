import { assert } from 'chai';

import imageContainer from '../server/api/helpers/imageContainer';

const entries = [
  {
    html: '<img src="/img/60x30.png" alt="60x30" class="zoom" data-zoom-src="/img/60x30-original.png">',
  },
  {
    html: `<div>
  <img src="/img/20x50.jpg">
</div>
<img src="/img/40x10.svg" alt="40x10">`,
  },
  {
    html: '<div>Hello, World!</div>',
  },
];

describe('ImageContainer', () => {
  const modifiedEntries = imageContainer(entries, __dirname);

  it('Parses one image', () => {
    assert.include(modifiedEntries[0].html, '<div class="image-container" style="width: 60px;">');
    assert.include(modifiedEntries[0].html, '<div style="padding-bottom: 50%">');
  });

  it('Parses multiple images', () => {
    assert.include(modifiedEntries[1].html, '<div class="image-container" style="width: 20px;">');
    assert.include(modifiedEntries[1].html, '<div style="padding-bottom: 250%">');

    assert.include(modifiedEntries[1].html, '<div class="image-container" style="width: 40px;">');
    assert.include(modifiedEntries[1].html, '<div style="padding-bottom: 25%">');
  });

  it('Doesn’t parse things it shouldn’t', () => {
    assert.equal(modifiedEntries[2].html.length, entries[2].html.length);
  });

  it('Doesn’t crash when passing in an empty array', () => {
    const emptyEntries = [];
    assert.equal(emptyEntries, imageContainer(emptyEntries));
  });
});
