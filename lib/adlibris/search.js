const axios = require('axios');
const cheerio = require('cheerio');

const {parseFormat, parseLanguage} = require('../utils');

function fetchResults(url, options) {
  return axios.get(url, options).then(response => {
    const $ = cheerio.load(response.data);
    const result = [];
    $('#search-hits').children().each((index, element) => {
      const image = $(element).find('img').data('src');
      const title = $(element).find('.search-result__product__name').text().trim();
      const authors = $(element).find('[itemprop="author"]').text().trim().replace(/\s*\n\s*/gm, '\n').split('\n');
      const description = $(element).find('.search-result__list-view__product__information__description').text().trim().replace(/\s*…\s*/, '...');
      const form = $(element).find('.product-item__price-from.price-from').text().trim().split(/, \n/).map(x => x.replace(/\s*$/, '').replace(/^\s*/, ''));
      const price = $(element).find('.price.sek').text().trim().split(' ')[0];
      const url = $(element).find('.search-result__product__name').attr('href');

      const [formfactor, published, language, isbn] = form;

      result.push({
        image,
        url,
        title,
        authors,
        description,
        formfactor: parseFormat(formfactor),
        published,
        language: parseLanguage(language),
        isbn: isbn.split(' ')[1] || null,
        price,
        priceUnit: 'sek'
      });
    });

    return Promise.resolve(result);
  });
}

function search(query, {items}) {
  const pages = Math.ceil(items / 12);

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
