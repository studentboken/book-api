const Source = require('../source');
const search = require('./search');

class Adlibris extends Source {
  search(query, options) {
    return search(query, Object.assign({
      items: 12
    }, options));
  }
}

module.exports = Adlibris;
