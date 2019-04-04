// ISO 639-1 standard language codes
function parseLanguage(language) {
  if (!language)
    return null;

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

function parseFormfactor(formfactor) {
  if (!formfactor)
    return null;

  if (formfactor.match(/häftad|falsad/i))
    return 'paperback';

  if (formfactor.match(/inbunden/i))
    return 'hardcover';

  if (formfactor.match(/ljudbok/i))
    return 'audio book';

  if (formfactor.match(/pocket/i))
    return 'pocket';

  return null;
}

function flatten(arrays) {
  return arrays.reduce((res, x) => res.concat(x), []);
}

module.exports = {
  parseLanguage,
  parseFormfactor,
  flatten
};
