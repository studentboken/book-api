class Source {
  search(query, options) {
    return Promise.reject(new Error(`Error fetching results for <${query}> with options <${options ? options : ''}>: Not implemented`));
  }

  fetch(book) { /* eslint no-unused-vars: "off" */
    return Promise.reject(new Error('Error fetching book: Not implemented'));
  }
}

module.exports = Source;
