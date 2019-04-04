#! /usr/bin/env node

const fs = require('fs');

const debug = require('debug')('book-api:app');
const yargs = require('yargs');

const {searchAll} = require('./convenience-methods');

async function main(argv) {
  if (argv.debug)
    require('debug').enable('book-api:*');
  const books = await searchAll(argv.query.split(','), argv);

  if (argv.output) {
    debug('Writing results to file');
    fs.writeFileSync(argv.output, JSON.stringify(books, null, 2));
  } else {
    console.log(JSON.stringify(books, null, 2));
  }
}

// Parse command line options and run main
yargs
  .usage('Usage: $0 <options>')
  .epilogue('A tool to retrieve information about books from several different sources.')
  .version('version', require('../package.json').version)
  .option('fetch-all', {type: 'boolean', describe: 'Fetch all search results'})
  .option('search-all-sources', {type: 'boolean', describe: 'Search all sources'})
  .option('search-results', {alias: 'n', type: 'number', describe: 'Number of search results to include. Is not guaranteed to be honoured'})
  .option('parallel-queries', {describe: 'The number of queries to process simultaneously', default: 3})
  .option('minimum-delay', {describe: 'The minimum number of milliseconds to wait between requests', default: 100})
  .option('maximum-delay', {describe: 'The maximum number of milliseconds to wait between requests', default: 5000})
  .option('output', {alias: 'o', describe: 'Path to the output file'})
  .option('debug', {alias: 'd', type: 'boolean', describe: 'Run in debugging mode'})
  .example('book-api --help', 'Show this help page')
  .example('book-api "test"')
  .example('book-api "book a","book b"')
  .recommendCommands()
  .command('$0 <query>', 'Search for the query', () => {}, main).parse();
