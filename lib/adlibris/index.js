const Source = require('../source');
const search = require('./search');
const fetch = require('./fetch');

class Adlibris extends Source {
  search(query, options) {
    return search(query, Object.assign({
      items: 12
    }, options));
  }

  fetch(item) {
    if (!item || !item.url)
      return Promise.reject(new Error('No url for item'));

    return fetch(item);
  }
}

module.exports = Adlibris;
