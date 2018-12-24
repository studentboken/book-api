const Source = require('./lib/adlibris');

const source = new Source();
source.search('test', {items: 25}).then(x => {
  console.log(x.length);
  console.log(x[3]);
  source.fetch(x[3]).then(y => {
    console.log(y);
  });
});
