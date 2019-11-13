const axios = require('axios');
const cheerio = require('cheerio');
const debug = require('debug')('book-api:adlibris-fetch');

function fetch(book, url) {
  debug(`Fetching book with url ${url}`);

  return new Promise((resolve, reject) => {
    axios.get(url).then(response => {
      debug('Fetched book. Formatting');
      const $ = cheerio.load(response.data);
      const scripts = $('script');

      let pageData = null;
      scripts.each((index, script) => {
        const text = $(script).html();
        if (!text.includes('window.pageData'))
          return;

        pageData = JSON.parse(text.replace('window.pageData = ', '').replace('};', '}'));
      });

      if (!pageData)
        return reject(new Error('No page data available'));

      if (pageData['ProductVariants'].length === 0)
        return reject(new Error('No product data available'));

      const rawPublished = pageData['ProductVariants'][0]['Published'];
      book.published = new Date(`${rawPublished.slice(0, 5)}-${rawPublished.slice(4, 7)}-${rawPublished.slice(6, 9)}`);

      const publisherData = pageData['ProductVariants'][0]['ProductInfo']['Publisher'];
      if (publisherData)
        book.publisher = publisherData['Values'][0]['Value'];

      const pagesData = pageData['ProductVariants'][0]['ProductInfo']['Page'];
      if (pagesData)
        book.pages = pagesData['Values'][0]['Value'];

      const weightData = pageData['ProductVariants'][0]['ProductInfo']['Weight'];
      if (weightData)
        book.weight = `${weightData['Values'][0]['Value']} ${weightData['Values'][0]['Unit']}`;

      book.description = pageData['ProductVariants'][0]['Description'];

      if (!pageData['GetCategoryUri'])
        return resolve(book);

      axios.get('https://www.adlibris.com' + pageData['GetCategoryUri']).then(categoriesResponse => {
        book.categories = categoriesResponse.data['categories'].map(x => x['Category']['CategoryName']);

        debug('Formatted book');
        resolve(book);
      }).catch(reject);
    }).catch(reject);
  });
}

module.exports = fetch;
