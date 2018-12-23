const axios = require('axios');
const cheerio = require('cheerio');

function search(query) {
  return axios.get('https://www.adlibris.com/se/sok', {
    params: {
      q: query
    }
  }).then(response => {
    const $ = cheerio.load(response.data);
    const result = [];
    $('#search-hits').children().each((index, element) => {
      const image = $(element).find('img').data('src');
      const title = $(element).find('.search-result__product__name').text().replace(/^\s*/, '').replace(/\s*$/, '');
      const authors = $(element).find('[itemprop="author"]').text().replace(/^\s*/, '').replace(/\s*$/, '').replace(/\s*\n\s*/gm, '\n').split('\n');
      const description = $(element).find('.search-result__list-view__product__information__description').text().replace(/^\s*/, '').replace(/\s*$/, '').replace(/\s*…\s*/, '...');
      const form = $(element).find('.product-item__price-from.price-from').text().replace(/^\s*/, '').replace(/\s*$/, '').split(/, \n/).map(x => x.replace(/\s*$/, '').replace(/^\s*/, ''));
      const price = $(element).find('.price.sek').text().replace(/^\s*/, '').replace(/\s*$/, '').split(' ')[0];
      const url = $(element).find('.search-result__product__name').attr('href');

      const [formfactor, year, language, isbn] = form;

      result.push({
        image,
        url,
        title,
        authors,
        description,
        formfactor,
        year,
        language,
        isbn: isbn.split(' ')[1] || null,
        price,
        priceUnit: 'SEK'
      });
    });

    return Promise.resolve(result);
  });
}

module.exports = search;
