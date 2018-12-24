const axios = require('axios');
const cheerio = require('cheerio');

function fetch(item) {
  return axios.get(`https://www.adlibris.com${item.url}`).then(response => {
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

    return Promise.resolve(Object.assign(item, {
      published: result['Utgiven'] || item.published,
      publisher: result['Förlag'] || null,
      pages: Number(result['Antal sidor']) || null,
      weight: result['Vikt'] || null,
      description
    }));
  });
}

module.exports = fetch;
