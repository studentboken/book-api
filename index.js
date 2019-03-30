const Akademibokhandeln = require('./lib/akademibokhandeln');
const Adlibris = require('./lib/adlibris');

module.exports = {
  Akademibokhandeln,
  Adlibris,
  sources: [
    Akademibokhandeln,
    Adlibris
  ]
};
