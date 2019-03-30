class Source {
  search(query, options) {
    return Promise.reject(new Error(`Error fetching results for <${query}> with options <${options ? options : ''}>: Not implemented`));
  }

  fetch(book) {
    return Promise.reject(new Error(`Error fetching book <${book.url}>: Not implemented`));
  }
}

module.exports = Source;
