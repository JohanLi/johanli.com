const imagemin = require('imagemin');
const gifsicle = require('imagemin-gifsicle');
const mozjpeg = require('imagemin-mozjpeg');
const optipng = require('imagemin-optipng');

imagemin(['src/img/*.{gif,jpg,png,ico}'], 'public/img/', {
  plugins: [
    gifsicle(),
    mozjpeg({
      quality: 85,
      progressive: false,
    }),
    optipng(),
  ],
});
