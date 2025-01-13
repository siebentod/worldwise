export function spaceToHyphen(tag) {
  return tag.replace(/ /g, '-');
}

export function hyphenToSpace(tag) {
  return tag.replace(/-/g, ' ');
}
