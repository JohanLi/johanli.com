import { assert } from 'chai';

import prismjsHighlight from '../server/api/helpers/prismjsHighlight';

const entries = [
  {
    html: `<prismjs language="javascript">
console.log('Hello, World!');
</prismjs>`,
  },
  {
    html: `<prismjs language="javascript">
console.log('Hello, World!');
</prismjs>
<prismjs language="php">
<?php

echo 'Hello, World!';
</prismjs>
<div>
Hello, World!
</div>
<prismjs language="javascript">
const message = 'Hello, World!';
</prismjs>`,
  },
  {
    html: `<div>Hello, World!</div>
<prismjs>Should not be parsed</prismjs>`,
  },
];

describe('PrismjsHighlight', () => {
  const modifiedEntries = prismjsHighlight(entries);

  it('Parses one code block', () => {
    assert.include(modifiedEntries[0].html, '<pre class="language-javascript"><code class="language-javascript">');
    assert.include(modifiedEntries[0].html, '</code></pre>');
  });

  it('Parses multiple code blocks', () => {
    assert.include(modifiedEntries[1].html, '<pre class="language-javascript"><code class="language-javascript">');
    assert.include(modifiedEntries[1].html, '<pre class="language-php"><code class="language-php">');

    const closingTagCount = modifiedEntries[1].html.match(/<\/code><\/pre>/g).length;
    assert.equal(closingTagCount, 3);
  });

  it('Doesn’t parse things it shouldn’t', () => {
    assert.equal(modifiedEntries[2].html.length, entries[2].html.length);
  });

  it('Doesn’t crash when passing in an empty array', () => {
    const emptyEntries = [];
    assert.equal(emptyEntries, prismjsHighlight(emptyEntries));
  });
});
