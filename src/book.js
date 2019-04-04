class Book {
  constructor() {
    // The cost of the book - always available
    // Each item is a price:
    // price.value: null // The amount of the currency
    // price.currency: null // The currency of the price
    // price.source: null // The source's name
    this.marketPrices = [];

    // The International Standard Book Number (ISBN) - always available
    this.isbn = null;

    // Cover image - always available. As large as possible
    // cover.url : null // An url to the image
    this.cover = null;

    // Images - always available. All images found (including the cover itself)
    // image.url : null // An url to the image
    this.images = [];

    // Title of the book - always available
    this.title = null;

    // Array of authors of the book - always available, but can be empty
    this.authors = [];

    // Sources where the book is found - always available
    // Each item is a source:
    // source.url : null // URL to the book on its respective site
    // source.name : null // The source's name
    this.sources = [];

    // Formfactor of the book, such as paperback - always available but could be null
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

    // The language of the book (ISO 639-1) - always available for Adlibris,
    // available after fetching for Akademibokhandeln - both sources can however be 'unknown'
    this.language = null;

    // Weight of the book - available after fetching for Adlibris,
    // not available for Akademibokhandeln
    this.weight = null;
  }

  /**
  * Merges this book with another and returns it.
  * The already existing values are prioritized.
  * @param {Book} book - The book to merge.
  * @returns {Book} The updated book.
  */
  merge(book) {
    this.marketPrices.push(...book.marketPrices);
    this.isbn = this.isbn || book.isbn;
    this.cover = this.cover || book.cover;
    this.images.push(...book.images);
    this.title = this.title || book.title;
    this.authors = [...new Set([...this.authors, ...book.authors])];
    this.sources.push(...book.sources);
    this.formfactor = this.formfactor || book.formfactor;
    this.description = this.description || book.description;
    this.categories = [...new Set([...this.categories, ...book.categories])];
    this.published = this.published || book.published;
    this.publisher = this.publisher || book.publisher;
    this.pages = this.pages || book.pages;
    this.language = this.language || book.language;
    this.weight = this.weight || book.weight;

    return this;
  }
}

module.exports = Book;
