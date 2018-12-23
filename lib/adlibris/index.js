const Source = require('../source');
const search = require('./search');

class Adlibris extends Source {
  search(query) {
    return search(query);
  }
}

module.exports = Adlibris;
