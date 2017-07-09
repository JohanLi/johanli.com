require('babel-register')({
  presets: 'es2015',
});

require.extensions['.svg'] = () => null;
