const axios = require('axios');
const cheerio = require('cheerio');

const {parseFormat, flatten} = require('../utils');
const Book = require('../book');

function fetchResults(url, options) {
  return axios.get(url, options).then(response => {
    const $ = cheerio.load(response.data.productGridHTML);
    const bindings = response.data.searchFilterData.facets.binding.map(x => parseFormat(x.name));

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

        const book = new Book();

        book.price.value = Number(item['ourPrice']);
        book.price.unit = 'sek';
        book.isbn = item['isbn'];
        book.cover = Object.assign(book.cover, {
          small: item['imgSmall'],
          medium: item['imgMedium']
        });
        book.title = item['title'];
        book.authors = item['authors'];
        book.url = 'https://www.akademibokhandeln.se' + item['url'];
        book.formfactor = bindings[item['typeOfBinding']];
        book.description = null;
        book.categories = [];

        books.push(book);
      }
    });

    return Promise.resolve(books);
  });
}

function search(query, {items}) {
  const pages = Math.ceil(items / 20);

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
