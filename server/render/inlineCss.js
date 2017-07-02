const path = require('path');
const fs = require('fs');
const { promisify } = require('util');
const readFileAsync = promisify(fs.readFile);

const linkRegexp = /<link href="\/styles-([\s\S]*?).css" rel="stylesheet">/;

module.exports = async (html, req, res) => {
  const match = html.match(linkRegexp);

  if (req.cookies['css-loaded'] === match[1]) {
    return html;
  }

  const month = 1000 * 60 * 60 * 24 * 30;

  res.cookie('css-loaded', match[1], {
    maxAge: month,
    httpOnly: true,
    secure: true,
  });

  let css = await readFileAsync(
    path.resolve(__dirname, `public/styles-${match[1]}.css`),
    'utf8',
  );

  return html.replace(
    match[0],
    `<link href="/styles-${match[1]}.css" rel="stylesheet" media="none">
    <style>${css}</style>`,
  );
};
