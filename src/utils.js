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
    return 'unknown';

  if (formfactor.match(/häftad|falsad/i))
    return 'paperback';

  if (formfactor.match(/inbunden/i))
    return 'hardcover';

  if (formfactor.match(/ljudbok/i))
    return 'audio book';

  if (formfactor.match(/pocket/i))
    return 'pocket';

  if (formfactor.match(/kartonnage/i))
    return 'cartonnage';

  if (formfactor.match(/danskband/i))
    return 'paperback';

  if (formfactor.match(/CD-skiva/i))
    return 'cd';

  return 'unknown';
}

function flatten(arrays) {
  return arrays.reduce((res, x) => res.concat(x), []);
}

function sanitizeTitle(title) {
  // Some books include a digital product, disregard this
  title = title.replace(/\(bok \+ digital produkt\)/gi, '');

  // Some books have title like '[With CDRom]', disregard this
  title = title.repalce(/\[with cdrom\]/gi, '');

  // Some books have a title such as 'Mathematics : 101', remove spaces before ':'
  title = title.replace(/ +:/, ':');

  // Due to the above removal, some titles may have trailing commas, hyphens etc
  title = title.replace(/[-:,().;] *$/, '');

  // Remove any leading or trailing whitespace
  title = title.trim();

  return title;
}

module.exports = {
  parseLanguage,
  parseFormfactor,
  flatten,
  sanitizeTitle
};
