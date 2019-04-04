const debug = require('debug')('book-api:convenience-methods');

const sources = [
  require('./adlibris'),
  require('./akademibokhandeln')
];

/**
* Search asynchronously for a query using sensible source priority.
* @param {String} query - The query to search for.
* @param {Object} options - Optional options.
* @param {Boolean} options.fetchAll - Fetch all search results. Defaults to false.
* @param {Boolean} options.searchAllSources - Search all sources. Defaults to false.
* @param {Number} options.searchResults - Number of search results to include. Is not guaranteed to be honoured. Defaults to 0 (predefined).
* @returns {Array} Array of books.
*/
async function search(query, options = {fetchAll: false, searchAllSources: false, searchResults: 0}) {
  const books = [];

  for (const Source of sources) {
    const source = new Source();
    debug(`Searching on ${source.constructor.name}`);
    const results = await source.search(query); /* eslint no-await-in-loop: "off" */

    const resultsToKeep = options.searchResults || results.length;
    debug(`Filtering ${resultsToKeep} results`);
    let filteredResults = results.slice(0, resultsToKeep);

    if (options.fetchAll) {
      debug(`Fully fetching ${resultsToKeep} books`);
      filteredResults = await Promise.all(filteredResults.map(x => source.fetch(x)));
    }

    for (const book of filteredResults) {
      // Try to complement data if a similar book already exists
      if (book.isbn) {
        const existingIndex = books.findIndex(x => x.isbn === book.isbn);
        if (existingIndex === -1)
          books.push(book);
        else
          books[existingIndex].merge(book);
      } else {
        book.push(book);
      }
    }

    if (filteredResults.length > 0 && !options.searchAllSources)
      break;
  }

  return books;
}

module.exports = {
  search
};
