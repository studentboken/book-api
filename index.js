module.exports = {
  Akademibokhandeln: require('./lib/akademibokhandeln'),
  Adlibris: require('./lib/adlibris')
};

const Akademibokhandeln = require('./lib/akademibokhandeln');
const source = new Akademibokhandeln();

source.search('Test Driven Development').then(results => {
  source.fetch(results[0]).then(results => {
    console.log(JSON.stringify(results, null, 2));
  })
});
