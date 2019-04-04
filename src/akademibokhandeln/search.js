const axios = require('axios');
const cheerio = require('cheerio');
const debug = require('debug')('book-api:akademibokhandeln-search');

const {parseFormfactor, flatten} = require('../utils');
const Book = require('../book');

function fetchResults(url, options) {
  debug(`Fetching results for url ${url}`);
  return axios.get(url, options).then(response => {
    debug('Fetched results. Formatting');
    const $ = cheerio.load(response.data.productGridHTML);
    const bindings = response.data.searchFilterData.facets.binding;

    // Lacks category:
    // category: topics[item['category']], Note: the category always seem to be '1'
    // const topics = response.data.searchFilterData.facets.topic.map(x => x.display);

    const books = [];

    $('.product-grid-item').each((index, element) => {
      const script = $(element).find('script').get()[0];
      const content = script.children[0].data;
      const cartItem = content.match(/__addToCartData.push\((.*)\)/);
      if (cartItem !== null && cartItem.length >= 1) {
        const item = JSON.parse(cartItem[1]);

        // Books in the search page of Akademibokhandeln always have the formfactor given. Other products,
        // however do not. We're only interested in books - discard any other products
        if (!bindings[item['typeOfBinding']])
          return;

        const book = new Book();

        book.marketPrices.push({
          value: Number(item['ourPrice']),
          currency: 'sek',
          source: 'Akademibokhandeln'
        });
        book.isbn = item['isbn'];
        if (item['imgMedium']) {
          book.cover = {url: item['imgMedium']};
          book.images.push({url: item['imgMedium']});
        }
        if (item['imgSmall']) {
          book.cover = book.cover || {url: item['imgSmall']};
          book.images.push({url: item['imgSmall']});
        }
        book.title = item['title'];
        book.authors = item['authors'].filter(x => x && x !== '');
        book.sources.push({
          url: 'https://www.akademibokhandeln.se' + item['url'],
          name: 'Akademibokhandeln'
        });
        book.formfactor = parseFormfactor(bindings[item['typeOfBinding']].name);

        books.push(book);
      }
    });

    debug('Formatted results');
    return Promise.resolve(books);
  });
}

function search(query, {items}) {
  const pages = Math.ceil(items / 20);
  debug(`Searching for ${query} and retrieving ${pages} pages (${items} items)`);

  const fetches = [];
  for (let page = 1; page <= pages; page++) {
    fetches.push(fetchResults('https://www.akademibokhandeln.se/sok/', {
      params: {
        sokfraga: query,
        page,
        typ: 'B',
        responseFormat: 'json'
      }
    }));
  }

  return Promise.all(fetches).then(x => Promise.resolve(flatten(x)));
}

module.exports = search;
