import { stripUnit } from "./strip-unit";

export function convertCamelCaseToFirstLetters(value: string) {
  const words = [];
  let currentWord = '';

  for (let i = 0; i < value.length; i++) {
    let char = value.charAt(i);

    if (char === char.toUpperCase()) {
      if (currentWord !== "") {
        words.push(currentWord);
      }
      currentWord = char.toLowerCase();
      continue;
    }

    currentWord += char;
  }

  if (currentWord !== "") {
    words.push(currentWord);
  }

  const firstLetters = words.map((word) => {
    return word.charAt(0);
  });

  return firstLetters.join('');
}

export function convertPxToRem(
  value: string,
  root: string,
) {
  return `${stripUnit(value) / stripUnit(root)}rem`;
}
