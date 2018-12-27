const axios = require('axios');
const cheerio = require('cheerio');

const {parseFormat, flatten} = require('../utils');

function fetchResults(url, options) {
  return axios.get(url, options).then(response => {
    const $ = cheerio.load(response.data.productGridHTML);
    const bindings = response.data.searchFilterData.facets.binding.map(x => parseFormat(x.name));

    // Lacks category:
    // category: topics[item['category']], Note: the category always seem to be '1'
    // const topics = response.data.searchFilterData.facets.topic.map(x => x.display);

    const result = [];

    $('.product-grid-item').each((index, element) => {
      const script = $(element).find('script').get()[0];
      const content = script.children[0].data;
      const cartItem = content.match(/__addToCartData.push\((.*)\)/);
      if (cartItem !== null && cartItem.length >= 1) {
        const item = JSON.parse(cartItem[1]);

        result.push({
          price: Number(item['ourPrice']),
          priceUnit: 'sek',
          isbn: item['isbn'],
          images: {
            small: item['imgSmall'],
            medium: item['imgMedium']
          },
          title: item['title'],
          authors: item['authors'],
          url: item['url'],
          format: bindings[item['typeOfBinding']],
          description: null,
          categories: null
        });
      }
    });

    return Promise.resolve(result);
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
