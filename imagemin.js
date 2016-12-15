const imagemin = require('imagemin');
const mozjpeg = require('imagemin-mozjpeg');
const optipng = require('imagemin-optipng');

imagemin(['src/img/*.{jpg,png,ico}'], 'public/img/', {
    plugins: [
        mozjpeg({
            quality: 85,
            progressive: false
        }),
        optipng()
    ]
});