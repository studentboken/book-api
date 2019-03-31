const test = require('ava');

const {search} = require('../src/convenience-methods');
const Book = require('../src/book');

test('Can search for books using predefined order', async t => {
  // The query 'test' is known to have results - expect this to be true
  const result = await search('test');

  const resultIsArray = Array.isArray(result);
  t.true(resultIsArray);

  if (resultIsArray) {
    const firstResult = result[0];
    t.true(firstResult instanceof Book);
  }
});

test('Can search for all books', async t => {
  // The query 'test' is known to have results - expect this to be true
  const result = await search('test', {searchAllSources: true});

  const resultIsArray = Array.isArray(result);
  t.true(resultIsArray);

  if (resultIsArray) {
    const resultingSources = result.map((book => book.url.match(/\.([^.]*)\./)[1]))
      .reduce((res, source) => res.includes(source) ? res : [...res, source], []);
    t.true(resultingSources.length > 1);
  }
});

test('Can search for a single book using predefined order', async t => {
  // The query 'test' is known to have results - expect this to be true
  const result = await search('test', {searchResults: 1});

  const resultIsArray = Array.isArray(result);
  t.true(resultIsArray);

  if (resultIsArray) {
    t.is(1, result.length);

    const firstResult = result[0];
    t.true(firstResult instanceof Book);
  }
});

test('Can fetch resulting books', async t => {
  // The query 'test' is known to have results - expect this to be true
  const result = await search('test', {fetchAll: true});

  const resultIsArray = Array.isArray(result);
  t.true(resultIsArray);

  if (resultIsArray) {
    const firstResult = result[0];
    t.true(firstResult instanceof Book);
    // The publisher is always available <after> fetching and defaults to null,
    // as per /lib/book.js
    t.truthy(firstResult.publisher);
  }
});
