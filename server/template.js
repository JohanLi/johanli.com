const template = (appHtml) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1">
      <title>Johan Li | Web Developer</title>
      <link rel="stylesheet" type="text/css" href="/styles.css">
    </head>
    <body>
      <div id="root">${appHtml}</div>
    </body>
    </html>
  `;
};

export default template;
