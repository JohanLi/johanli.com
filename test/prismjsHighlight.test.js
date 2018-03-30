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
    expect(modifiedEntries[0].html).toContain('<pre class="language-javascript"><code class="language-javascript">');
    expect(modifiedEntries[0].html).toContain('</code></pre>');
  });

  it('Parses multiple code blocks', () => {
    expect(modifiedEntries[1].html).toContain('<pre class="language-javascript"><code class="language-javascript">');
    expect(modifiedEntries[1].html).toContain('<pre class="language-php"><code class="language-php">');

    const closingTagCount = modifiedEntries[1].html.match(/<\/code><\/pre>/g).length;
    expect(closingTagCount).toEqual(3);
  });

  it('Doesn’t parse things it shouldn’t', () => {
    expect(modifiedEntries[2].html.length).toEqual(entries[2].html.length);
  });

  it('Doesn’t crash when passing in an empty array', () => {
    const emptyEntries = [];
    expect(emptyEntries).toEqual(prismjsHighlight(emptyEntries));
  });
});
