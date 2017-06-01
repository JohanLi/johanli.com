const imagemin = require('imagemin');
const gifsicle = require('imagemin-gifsicle');
const jpegtran = require('imagemin-jpegtran');
const pngquant = require('imagemin-pngquant');
const svgo = require('imagemin-svgo');

const inputs = [
  {
    input: ['src/img/*.{gif,jpg,png,svg,ico}'],
    output: 'public/img',
  },
  {
    input: ['src/img/side-projects/*.png'],
    output: 'public/img/side-projects',
  },
];

inputs.forEach((input) => {
  imagemin(input.input, input.output, {
    plugins: [
      gifsicle(),
      jpegtran(),
      pngquant({ quality: '65-80' }),
      svgo({
        plugins: [{
          removeViewBox: false,
        }],
      }),
    ],
  });
});
