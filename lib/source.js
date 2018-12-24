class Source {
  search(query, options) {
    return Promise.reject(new Error(`Error fetching results for <${query}> with options <${options}>: Not implemented`));
  }

  fetch(item) {
    return Promise.reject(new Error(`Error fetching item <${item}>`));
  }
}

module.exports = Source;
