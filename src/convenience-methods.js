const debug = require('debug')('book-api:convenience-methods');

const sources = [
  require('./adlibris'),
  require('./akademibokhandeln')
];

/**
* Wait asynchronously.
* @param {Number} min - The minimum wait time.
* @param {Number} max - The maximum wait time.
*/
async function wait(min, max) {
  await new Promise(resolve => {
    setTimeout(resolve, Math.max(Math.floor(Math.random() * min), max));
  });
}

/**
* Search asynchronously for a query using sensible source priority.
* @param {String} query - The query to search for.
* @param {Object} options - Optional options.
* @param {Boolean} options.fetchAll - Fetch all search results. Defaults to false.
* @param {Boolean} options.searchAllSources - Search all sources. Defaults to false.
* @param {Number} options.searchResults - Number of search results to include. Is not guaranteed to be honoured. Defaults to 0 (predefined).
* @returns {Array} Array of books.
*/
async function search(query, options = {}) {
  options = Object.assign({
    fetchAll: false,
    searchAllSources: false,
    searchResults: 0
  }, options);

  const books = [];

  for (const Source of sources) {
    const source = new Source();
    debug(`Searching on ${source.constructor.name}`);
    const results = await source.search(query); /* eslint no-await-in-loop: "off" */

    if (results.length === 0) {
      debug(`No results for ${query} on ${source.constructor.name}`);
      continue;
    }

    const resultsToKeep = options.searchResults || results.length;
    debug(`Filtering ${resultsToKeep} results`);
    let filteredResults = results.slice(0, resultsToKeep);

    if (options.fetchAll && filteredResults.length > 0) {
      debug(`Fully fetching ${resultsToKeep} books`);
      filteredResults = await Promise.all(filteredResults.map(x => source.fetch(x)));
    }

    for (const book of filteredResults) {
      // Try to complement data if the same book already exists (based on ISBN)
      if (book.isbn) {
        const existingIndex = books.findIndex(x => x.isbn === book.isbn);
        if (existingIndex === -1)
          books.push(book);
        else
          books[existingIndex].merge(book);
      } else {
        books.push(book);
      }
    }

    if (filteredResults.length > 0 && !options.searchAllSources)
      break;
  }

  return books;
}

/**
* Search asynchronously for a query using sensible source priority.
* @param {Array} queries - Array of queries to search for.
* @param {Object} options - Optional options.
* @param {Boolean} options.fetchAll - Fetch all search results. Defaults to false.
* @param {Boolean} options.searchAllSources - Search all sources. Defaults to false.
* @param {Number} options.searchResults - Number of search results to include. Is not guaranteed to be honoured. Defaults to 0 (predefined).
* @param {Number} options.parallelQueries - The number of queries to process simultaneously.
* @returns {Array} Array of books.
*/
async function * searchAll(queries, options = {}) {
  options = Object.assign({
    fetchAll: false,
    searchAllSources: false,
    searchResults: 0,
    parallelQueries: 3
  }, options);

  const batches = [];
  for (let i = 0; i < queries.length; i += options.parallelQueries)
    batches.push(queries.slice(i, i + options.parallelQueries));

  for (const batch of batches) {
    debug(`Processing ${batch.length} queries`);
    const results = await Promise.all(batch.map(query => search(query, options))); /* eslint no-await-in-loop: "off" */
    yield results.flat(2);
  }
}

module.exports = {
  search,
  searchAll,
  wait
};
