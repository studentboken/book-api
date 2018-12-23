const test = require('ava');

const Source = require('../lib/source');

test('Non-implemented source class throws on search', async t => {
  const source = new Source();
  const error = await t.throwsAsync(source.search('foo bar'));
  t.is('Error fetching results for <foo bar>: Not implemented', error.message);
});
