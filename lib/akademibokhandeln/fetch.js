const axios = require('axios');
const cheerio = require('cheerio');

const {parseLanguage} = require('../utils');

function fetch(book) {
  return axios.get(book.url).then(response => {
    const $ = cheerio.load(response.data);

    const category = $('.product-details__topic').text().trim();
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

    return Promise.resolve(book);
  });
}

module.exports = fetch;
