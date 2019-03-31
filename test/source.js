const test = require('ava');

const Book = require('../src/book');
const Source = require('../src/source');

test('Non-implemented source class throws on search', async t => {
  const source = new Source();
  const error = await t.throwsAsync(source.search('foo bar'));
  t.is('Error fetching results for <foo bar> with options <>: Not implemented', error.message);
});

test('Non-implemented source class throws on fetch', async t => {
  const source = new Source();
  const error = await t.throwsAsync(source.fetch(new Book()));
  t.is('Error fetching book <null>: Not implemented', error.message);
});
