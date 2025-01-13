export function getTitle(text) {
  let title = text
    .match(/^#(.*)$/m)[1]
    .trim()
    .replace(/\\#|\\_/g, ' ');

  // Удаление заглавия в первой строке
  text = text.replace(/^\s*#.*$/m, '');

  return [text, title];
}
