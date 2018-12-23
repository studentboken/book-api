const Source = require('./lib/adlibris');

const source = new Source();
source.search('test').then(console.log);
