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
    expect(modifiedEntries[0].html).toContain('<div class="imageContainer" style="width: 60px;">');
    expect(modifiedEntries[0].html).toContain('<div style="padding-bottom: 50%">');
  });

  it('Parses multiple images', () => {
    expect(modifiedEntries[1].html).toContain('<div class="imageContainer" style="width: 20px;">');
    expect(modifiedEntries[1].html).toContain('<div style="padding-bottom: 250%">');

    expect(modifiedEntries[1].html).toContain('<div class="imageContainer" style="width: 40px;">');
    expect(modifiedEntries[1].html).toContain('<div style="padding-bottom: 25%">');
  });

  it('Doesn’t parse things it shouldn’t', () => {
    expect(modifiedEntries[2].html.length).toEqual(entries[2].html.length);
  });

  it('Doesn’t crash when passing in an empty array', () => {
    const emptyEntries = [];
    expect(emptyEntries).toEqual(imageContainer(emptyEntries));
  });
});
