const axios = require('axios');
const cheerio = require('cheerio');
const debug = require('debug')('book-api:adlibris-search');

const {parseFormfactor, parseLanguage, sanitizeTitle} = require('../utils');
const Book = require('../book');

function fetchResults(url, options) {
  debug(`Fetching results for url ${url}`);
  return axios.get(url, options).then(response => {
    debug('Fetched results. Formatting');
    const $ = cheerio.load(response.data);
    const books = [];
    $('#search-hits').children().each((index, element) => {
      const image = $(element).find('img').data('src');
      const title = $(element).find('.search-result__product__name').text().trim();
      const authors = $(element).find('[itemprop="author"]').text().trim().replace(/\s*\n\s*/gm, '\n').split('\n');
      const description = $(element).find('.search-result__list-view__product__information__description').text().trim().replace(/\s*…\s*/, '...');
      const form = $(element).find('.product-item__price-from.price-from').text().trim().split(/, \n/).map(x => x.replace(/\s*$/, '').replace(/^\s*/, ''));
      const price = $(element).find('.price.sek').text().trim().split(' ')[0];
      const url = $(element).find('.search-result__product__name').attr('href');

      const [formfactor, published, language, isbn] = form;
      // Books in the search page of Adlibris always have the formfactor given. Other products,
      // however do not. We're only interested in books - discard any other products
      if (!formfactor)
        return;

      const book = new Book();
      book.cover = {url: image};
      book.images.push(book.cover);
      book.sources.push({
        url: 'https://www.adlibris.com' + url,
        name: 'Adlibris'
      });
      book.title = sanitizeTitle(title);
      book.authors = authors.filter(x => x && x !== '');
      book.description = description;
      book.formfactor = parseFormfactor(formfactor);
      book.published = published ? new Date(published) : null;
      book.language = parseLanguage(language);
      book.isbn = isbn ? isbn.split(' ')[1] || null : null;
      book.marketPrices.push({
        value: Number(price),
        currency: 'sek',
        source: 'Adlibris'
      });

      books.push(book);
    });

    debug('Formatted results');
    return Promise.resolve(books);
  });
}

function search(query, {items}) {
  const pages = Math.ceil(items / 12);
  debug(`Searching for ${query} and retrieving ${pages} pages (${items} items)`);

  const fetches = [];
  for (let page = 1; page <= pages; page++) {
    fetches.push(fetchResults('https://www.adlibris.com/se/sok', {
      params: {
        q: query,
        pn: page,
        ps: 12
      }
    }));
  }

  return Promise.all(fetches).then(x => x.reduce((acc, val) => acc.concat(val), []));
}

module.exports = search;
