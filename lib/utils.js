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

  return language;
}

function parseFormat(format) {
  if (format.match(/häftad/i))
    return 'paperback';

  if (format.match(/inbunden/i))
    return 'hardcover';
}

module.exports = {
  parseLanguage,
  parseFormat
};
