const Prism = require('prismjs');
require('prismjs/components/prism-php.js');
require('prismjs/components/prism-php-extras.js');

const prismjsRegexp = /<prismjs language="(javascript|php)">\r?\n([\s\S]*?)\r?\n<\/prismjs>/g;

/* TODO handle extra indentation */
module.exports = (entries) => {
  entries.forEach((entry) => {
    let match;

    while (match = prismjsRegexp.exec(entry.html)) {
      const code = Prism.highlight(match[2], Prism.languages[match[1]]);

      entry.html = `${entry.html.substring(0, match.index)}
        <pre class="language-${match[1]}"><code class="language-${match[1]}">${code}</code></pre>
        ${entry.html.substring(match.index + match[0].length)}`;
    }
  });
  return entries;
};
