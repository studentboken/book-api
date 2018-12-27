// TODO: implement all languages from Akademibokhandeln, see:
//https://www.akademibokhandeln.se/sok/?responseFormat=json&sokfraga=test&typ=B
function parseLanguage(language) {
  if (language.match(/svenska/i))
    return 'sv-SE';

  if (language.match(/english/i))
    return 'en-EN';

  if (language.match(/tyska|german/i))
    return 'de-DE';

  if (language.match(/ryska|russian/i))
    return 'ru-RU';

  if (language.match(/finska|finnish/i))
    return 'fi-FI';

  if (language.match(/spanska|spanish/i))
    return 'es-ES';

  if (language.match(/italienska|italian/i))
    return 'it-IT';

  if (language.match(/italienska|italian/i))
    return 'it-IT';

  return language;
}

function parseFormat(format) {
  if (format.match(/häftad/i))
    return 'paperback';

  if (format.match(/inbunden/i))
    return 'hardcover';

  if (format.match(/ljudbok/i))
    return 'audio book';

  if (format.match(/pocket/i))
    return 'pocket';

  if (format.match(/falsad/i))
    return 'paperback';

  return null;
}

function flatten(arrays) {
  return arrays.reduce((res, x) => res.concat(x), []);
}

module.exports = {
  parseLanguage,
  parseFormat,
  flatten
};
