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
    // Not available for Akademibokhandeln
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

module.exports = Book;
