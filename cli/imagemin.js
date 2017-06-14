const imagemin = require('imagemin');
const gifsicle = require('imagemin-gifsicle');
const mozjpeg = require('imagemin-mozjpeg');
const pngquant = require('imagemin-pngquant');
const svgo = require('imagemin-svgo');

const inputs = [
  {
    input: ['./build/public/img/*.{gif,jpg,png,svg,ico}'],
    output: './build/public/img',
  },
  {
    input: ['./public/img/*.{gif,jpg,png,svg,ico}'],
    output: './build/public/img',
  },
  {
    input: ['./public/img/side-projects/*.png'],
    output: './build/public/img/side-projects',
  },
];

inputs.forEach((input) => {
  imagemin(input.input, input.output, {
    plugins: [
      gifsicle(),
      mozjpeg({
        quality: 85,
        progressive: true,
      }),
      pngquant({ quality: '65-80' }),
      svgo({
        plugins: [{
          removeViewBox: false,
        }],
      }),
    ],
  });
});
