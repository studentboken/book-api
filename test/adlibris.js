const test = require('ava');

const Adlibris = require('../lib/adlibris');

test('Search returns results', async t => {
  const source = new Adlibris();
  const results = await source.search('test');
  t.true(Array.isArray(results));
});
