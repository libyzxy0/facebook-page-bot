import { fontText } from '@/utils/fonts';

export function mdConvert(md: string) {
  const boldRegex = /\*\*(.*?)\*\*/g;
  const headingRegex = /^(#{1,6})\s*(.*?)$/gm;
  const codeRegex = /`(.*?)`/g;

  md = md.replace(boldRegex, (match, p1) => {
    return fontText(p1, 'bold');
  });

  md = md.replace(headingRegex, (match, hashes, p1) => {
    return fontText(p1, 'bold');
  });

  md = md.replace(codeRegex, (match, p1) => {
    return fontText(p1, 'sansSerifItalic');
  });

  return md;
}
