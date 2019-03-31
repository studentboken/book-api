# Book API for Node JS
### A fully async API written in ES6 for fetching books from various sources
***
![npm badge](https://img.shields.io/npm/v/book-api.svg)

### Setting up

##### Installing

```
npm install book-api
```

##### Quickstart

###### CLI

```Bash
# Install
> npm install -g book-api
# Use
> book-api --help

book-api <query>

Search for the query

Options:
  --help                Show help                                      [boolean]
  --version             Show version number                            [boolean]
  --fetch-all           Fetch all search results                       [boolean]
  --search-all-sources  Search all sources                             [boolean]
  --search-results, -n  Number of search results to include. Is not guaranteed
                        to be honoured                                  [number]
  --output, -o          Path to the output file
  --debug, -d           Run in debugging mode                          [boolean]

```

###### Library

```JavaScript
const {Akademibokhandeln, Adlibris} = require('book-api');

const source = new Adlibris();

// Search for books
source.search('Test Driven Development')
.then(books => {
  source.fetch(books[0]).then(book => {
    console.log(book);
  });
});
```

```
{
  "price": {
    "value": 329,
    "currency": null,
    "unit": "sek"
  },
  "isbn": "9781934356623",
  "cover": {
    "small": "url-to-small-image",
    "medium": "url-to-large-image"
  },
  "title": "Test Driven Development for Embedded C",
  "authors": [
    "James W Grenning"
  ],
  "url": "url-to-product-page",
  "formfactor": "paperback",
  "description": "TDD is a modern programming practice C developers need to know [...]",
  "categories": [ "Data & IT" ],
  "published": "2011-05-09T00:00:00.000Z",
  "publisher": "THE PRAGMATIC BOOKSHELF",
  "pages": 351,
  "language": "en",
  "weight": null
}
```

### Documentation

The documentation is currently a bit sparse. For more information, refer to the source, tests and issues on GitHub.

#### Methods

The module exposes the following

```JavaScript
const {
  Akademibokhandeln, // Source
  Adlibris, // Source
  sources, // Enumerable array of the sources above
  search // Convenience method for searching for books
} = require('book-api');
```

#### Convenience methods

```JavaScript
/**
* Search asynchronously for a query using sensible source priority.
* @param {String} query - The query to search for.
* @param {Object} options - Optional options.
* @param {Boolean} options.fetchAll - Fetch all search results. Defaults to false.
* @param {Boolean} options.searchAllSources - Search all sources. Defaults to false.
* @param {Number} options.searchResults - Number of search results to include. Is not guaranteed to be honoured. Defaults to 0 (predefined).
* @returns {Array} Array of books.
*/
async function search(query, options) {
  ...
}
```

#### Book schema

Each book generated by this API follows the format as explained in `src/book.js` as shown below.

```JavaScript
class Book {
  constructor() {
    // The cost of the book - always available
    this.price = {
      // The amount of the currency
      value: null,
      // The currency of the price
      currency: null
    };

    // The International Standard Book Number (ISBN) - always available
    this.isbn = null;

    // Cover image - always available
    this.cover = {
      // A small version (About 300px)
      small: null,
      // A medium version (Usually at least 300px)
      medium: null
    };

    // Title of the book - always available
    this.title = null;

    // Array of authors of the book - always available
    this.authors = [];

    // URL to the book on its respective site - always available
    this.url = null;

    // Formfactor of the book, such as paperback - always available
    this.formfactor = null;

    // Description of the book - available in part for Adlibris, in full by fetching.
    // Available after fetching for Akademibokhandeln
    this.description = null;

    // Category of the book - available after fetching
    this.categories = [];

    // The date (or year) the book was published - always available for Adlibris,
    // available after fetching for Akademibokhandeln
    this.published = null;

    // The publisher of the book - available after fetching
    this.publisher = null;

    // The number of pages in the book - available after fetching
    this.pages = null;

    // The language of the book - always available for Adlibris,
    // available after fetching for Akademibokhandeln
    this.language = null;

    // Weight of the book - available after fetching for Adlibris,
    // not available for Akademibokhandeln
    this.weight = null;
  }
}
```

### Contributing

Any contribution is welcome. If you're not able to code it yourself, perhaps someone else is - so post an issue if there's anything on your mind.

###### Development

Clone the repository:
```
git clone https://github.com/AlexGustafsson/book-api.git && cd book-api
```

Set up for development:
```
npm install
```

Follow the conventions enforced:
```
npm run lint
npm run test
npm run coverage
npm run check-duplicate-code
```

### Disclaimer

_Although the project is very capable, it is not built with production in mind. Therefore there might be complications when trying to use the API for large-scale projects meant for the public. The API was created to easily fetch information about books programmatically and as such it might not promote best practices nor be performant. This project is not in any way affiliated with Akademibokhandeln or Adlibris._
