class Source {
  search(query, options) {
    return Promise.reject(new Error(`Error fetching results for <${query}> with options <${options}>: Not implemented`));
  }
}

module.exports = Source;
