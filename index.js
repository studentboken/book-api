const Source = require('./lib/akademibokhandeln');

const source = new Source();
source.search('hej', {items: 20}).then(x => {
  console.log(x.length);
  console.log(x[0]);
  source.fetch(x[0]).then(y => {
    console.log(y);
  });
});
