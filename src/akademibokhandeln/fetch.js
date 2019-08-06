const axios = require('axios');
const cheerio = require('cheerio');
const debug = require('debug')('book-api:akademibokhandeln-fetch');

const {parseLanguage} = require('../utils');

function fetch(book, url) {
  debug(`Fetching book with url ${url}`);
  return axios.get(url).then(response => {
    debug('Fetched book. Formatting');
    const $ = cheerio.load(response.data);

    const category = $('.product-details__topic').text().trim();
    const description = $('.product-preamble__text').text().trim();
    const info = $('.product-attributes-list').text().trim().replace(/\s*\n\s*/g, '\n').split('\n');

    const result = {};
    let key = null;
    let previous = [];
    for (const line of info) {
      if (line.match(/^[^:]+:$/)) {
        if (key !== null) {
          result[key] = previous.length > 1 ? previous : previous[0] || null;
          previous = [];
        }

        key = line.substr(0, line.length - 1);
      } else {
        previous.push(line);
      }
    }
    result[key] = previous.length > 1 ? previous : previous[0] || null;

    book.published = result['Utgivningsdatum'] ? new Date(result['Utgivningsdatum']) : null;
    book.publisher = result['Förlag'] || null;
    book.pages = Number(result['Antal sidor']) || null;
    book.language = parseLanguage(result['Språk']);
    book.categories = [category];
    book.description = description.replace(/<br[^/>]*\/?>/g, '\n');

    debug('Formatted book');
    return book;
  });
}

module.exports = fetch;
