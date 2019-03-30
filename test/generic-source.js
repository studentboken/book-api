const test = require('ava');

const Adlibris = require('../lib/adlibris');
const Akademibokhandeln = require('../lib/akademibokhandeln');
const Book = require('../lib/book');

async function testSource(t, Source) {
  const source = new Source();
  // The query 'test' is known to have results - expect this to be true
  const result = await source.search('test');

  const resultIsArray = Array.isArray(result);
  t.true(resultIsArray);

  if (resultIsArray) {
    const firstResult = result[0];
    t.true(firstResult instanceof Book);
    const rawFirstResult = Object.assign({}, firstResult);

    const complementedFirstResult = await source.fetch(firstResult);
    const rawComplementedFirstResult = Object.assign({}, complementedFirstResult);

    // The book argument is complemented and then returned back
    t.is(firstResult, complementedFirstResult);
    // The book should have had data added to it
    t.notDeepEqual(rawFirstResult, rawComplementedFirstResult);
  }
}

// This test does knowingly not follow best practices of isolating tests
test('Can search and fetch books on Adlibris', async t => {
  await testSource(t, Adlibris);
});

// This test does knowingly not follow best practices of isolating tests
test('Can search and fetch books on Akademibokhandeln', async t => {
  await testSource(t, Akademibokhandeln);
});
