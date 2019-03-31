const Adlibris = require('./src/adlibris');
const Akademibokhandeln = require('./src/akademibokhandeln');

const convenienceMethods = require('./src/convenience-methods');

module.exports = {
  Akademibokhandeln,
  Adlibris,
  sources: [
    Adlibris,
    Akademibokhandeln
  ],
  ...convenienceMethods
};
