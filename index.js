const Adlibris = require('./lib/adlibris');
const Akademibokhandeln = require('./lib/akademibokhandeln');

const convenienceMethods = require('./lib/convenience-methods');

module.exports = {
  Akademibokhandeln,
  Adlibris,
  sources: [
    Adlibris,
    Akademibokhandeln
  ],
  ...convenienceMethods
};
