import { encoded, translations } from './data.js';

// console.log("Let's rock");
// console.log(encoded, translations);

function endsWithId(str) {
  return str.endsWith('Id') || str.endsWith('id');
}

function decode(data, translations) {
  const list = data.map((item) => {
    return Object.keys(item).reduce((acc, key) => {
      let field = item[key];
      if (endsWithId(key) && key !== 'groupId' && field !== null) {
        if (translations.hasOwnProperty(field)) field = translations[field];
      }
      acc[key] = field;
      return acc;
    }, {});
  });

  return list;
}

const decoded = decode(encoded, translations);

console.log(decoded);

function getUniqueIds(data) {
  const translationsIds = Object.keys(translations);
  const missedInTranslations = {};
  const ids = {};
  data.forEach((item) => {
    Object.keys(item).forEach((key) => {
      if (endsWithId(key) && key !== 'groupId' && item[key] !== null) {
        ids[item[key]] = ids[item[key]] + 1 || 1;
        if (!translationsIds.includes(item[key]))
          missedInTranslations[item[key]] = item[key];
      }
    });
  });

  // Unique Ids were used only once
  const uniquelyUsedIds = Object.keys(ids).filter((key) => ids[key] === 1);

  return {
    ids: Object.keys(ids),
    uniquelyUsedIds: uniquelyUsedIds,
    missedInTranslations: Object.keys(missedInTranslations),
  };
}

console.log(getUniqueIds(encoded));
