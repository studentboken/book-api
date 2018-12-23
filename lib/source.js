class Source {
  search(query) {
    return Promise.reject(new Error(`Error fetching results for <${query}>: Not implemented`));
  }
}

module.exports = Source;
