const axios = require('axios');
const cheerio = require('cheerio');
const debug = require('debug')('book-api:adlibris-fetch');

function fetch(book, url) {
  debug(`Fetching book with url ${url}`);
  return axios.get(url).then(response => {
    debug('Fetched book. Formatting');
    const $ = cheerio.load(response.data);
    const description = $('#product-description').text().trim();
    const info = $('.product-info-panel__attributes.container').text().trim().replace(/\s*\n\s*/g, '\n').split('\n');

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

    const categories = $('#product-info-panel__categories').text().replace(/^\s*/gm, '').replace(/\s*$/gm, '').replace(/^[^\n]*\n/, '').replace(/\n/g, '').split(',');

    const formattedCategories = [];
    for (const line of categories) {
      const match = line.match(/([^(]+)(\(inom (.+)\))?/);
      if (match !== null) {
        if (match[3] && !formattedCategories.includes(match[3].trim()))
          formattedCategories.push(match[3].trim());

        if (match[1] && !formattedCategories.includes(match[1].trim()))
          formattedCategories.push(match[1].trim());
      }
    }

    book.published = result['Utgiven'] ? new Date(result['Utgiven']) : book.published;
    book.publisher = result['Förlag'] || null;
    book.pages = Number(result['Antal sidor']) || null;
    book.weight = result['Vikt'] || null;
    book.description = description;
    book.categories = formattedCategories;

    debug('Formatted book');
    return Promise.resolve(book);
  });
}

module.exports = fetch;
