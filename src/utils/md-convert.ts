import { fontText } from '@/utils/fonts';

/**
 * Converts markdown text to a formatted string.
 *
 * @param {string} md - The markdown text to convert.
 * @returns {string} The formatted string.
 */
export function mdConvert(md: string) {
  const bulletPointRegex = /^-\s*/gm;
  const boldRegex = /\*\*(.*?)\*\*/g;
  const headingRegex = /^(#{1,6})\s*(.*?)$/gm;
  const codeRegex = /`(.*?)`/g;

  md = md.replace(bulletPointRegex, '❒ ');

  md = md.replace(boldRegex, (match, p1) => {
    return fontText(p1, 'bold');
  });

  md = md.replace(headingRegex, (match, hashes, p1) => {
    return fontText(p1, 'bold');
  });

  md = md.replace(codeRegex, (match, p1) => {
    return fontText(p1,'sansSerifItalic');
  });

  md = md.replace(/:$/, '⤵');

  return md;
}
