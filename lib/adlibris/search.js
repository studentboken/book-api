const axios = require('axios');
const cheerio = require('cheerio');

function search(query) {
  return axios.get('https://www.adlibris.com/se/sok', {
    params: {
      q: query
    }
  }).then(response => {
    const $ = cheerio.load(response.data);
    const result = $('#search-hits').children().map((index, element) => {
      const image = $(element).find('img').data('src');
      const title = $(element).find('.search-result__product__name').text().replace(/^\s*/, '').replace(/\s*$/, '');
      const authors = $(element).find('[itemprop="author"]').text().replace(/^\s*/, '').replace(/\s*$/, '').replace(/\s*\n\s*/gm, '\n').split('\n');
      const description = $(element).find('.search-result__list-view__product__information__description').text().replace(/^\s*/, '').replace(/\s*$/, '').replace(/\s*…\s*/, '...');
      const form = $(element).find('.product-item__price-from price-from').text().replace(/^\s*/, '').replace(/\s*$/, '');
      const price = $(element).find('.price.sek').text().replace(/^\s*/, '').replace(/\s*$/, '');
      const url = $(element).find('.search-result__product__name').attr('href');

      console.log({
        image,
        url,
        title,
        authors,
        description,
        form, // Denna kommer ej med?
        price
      });
    });
  });
}

module.exports = search;
