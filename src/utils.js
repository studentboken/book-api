// ISO 639-1 standard language codes
function parseLanguage(language) {
  if (language.match(/svenska/i))
    return 'sv';

  if (language.match(/engelska|english/i))
    return 'en';

  if (language.match(/tyska|german/i))
    return 'de';

  if (language.match(/ryska|russian/i))
    return 'ru';

  if (language.match(/finska|finnish/i))
    return 'fi';

  if (language.match(/spanska|spanish/i))
    return 'es';

  if (language.match(/italienska|italian/i))
    return 'it';

  return language;
}

function parseFormat(format) {
  if (format.match(/häftad|falsad/i))
    return 'paperback';

  if (format.match(/inbunden/i))
    return 'hardcover';

  if (format.match(/ljudbok/i))
    return 'audio book';

  if (format.match(/pocket/i))
    return 'pocket';

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
