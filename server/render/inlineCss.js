import path from 'path';
import fs from 'fs';
import { promisify } from 'util';

const readFileAsync = promisify(fs.readFile);

const linkRegexp = /<link href="\/styles-([\s\S]*?).css" rel="stylesheet">/;

export default async (html, req, res) => {
  const match = html.match(linkRegexp);

  // TODO: Better solution for testing this, as hash is non-trivial to obtain
  if (req.cookies['css-loaded'] === match[1] || req.cookies['css-loaded'] === 'loadedDuringTest') {
    return html.replace('<html lang="en">', '<html lang="en" class="fontLoaded">');
  }

  const month = 1000 * 60 * 60 * 24 * 30;

  res.cookie('css-loaded', match[1], {
    maxAge: month,
    httpOnly: true,
    secure: true,
  });

  const css = await readFileAsync(
    path.resolve(__dirname, `public/styles-${match[1]}.css`),
    'utf8',
  );

  return html.replace(
    match[0],
    `
      <link href="/styles-${match[1]}.css" rel="stylesheet" media="none">
      <style>${css}</style>
      <script>
        if ('fonts' in document) {
          document.fonts.load('16px Roboto')
            .then(() => {
              document.documentElement.classList.add('fontLoaded');
            });
        } else {
          document.documentElement.classList.add('fontLoaded');
        }
      </script>
    `,
  );
};
