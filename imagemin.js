const imagemin = require('imagemin');
const gifsicle = require('imagemin-gifsicle');
const mozjpeg = require('imagemin-mozjpeg');
const optipng = require('imagemin-optipng');
const imageminSvgo = require('imagemin-svgo');

imagemin(['src/img/*.{gif,jpg,png,svg,ico}'], 'public/img/', {
  plugins: [
    gifsicle(),
    mozjpeg({
      quality: 85,
      progressive: false,
    }),
    optipng(),
    imageminSvgo({
      plugins: [
        {removeViewBox: false}
      ]
    }),
  ],
});
