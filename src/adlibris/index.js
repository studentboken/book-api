const Source = require('../source');
const search = require('./search');
const fetch = require('./fetch');

class Adlibris extends Source {
  search(query, options) {
    return search(query, Object.assign({
      items: 12
    }, options));
  }

  fetch(book) {
    if (!book)
      return Promise.reject(new Error('No book given'));
    const source = [...book.sources.filter(x => x.source === 'Adlibris'), null][0];
    if (!source)
      return Promise.reject(new Error('No url for book'));
    return fetch(book, source.url);
  }
}

module.exports = Adlibris;
