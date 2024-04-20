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

