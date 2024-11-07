import { fontText } from '@/utils/fonts';

export function mdConvert(md: string) {
  const boldRegex = /\*\*(.*?)\*\*/g;
  const headingRegex = /^(#{1,6})\s*(.*?)$/gm;
  const codeRegex = /`(.*?)`/g;
  const codeBlockRegex = /```[a-zA-Z]*\n([\s\S]*?)\n```/g;

  md = md.replace(boldRegex, (match, p1) => {
    return fontText(p1, 'bold');
  });

  md = md.replace(headingRegex, (match, hashes, p1) => {
    return fontText(p1, 'bold');
  });

  md = md.replace(codeRegex, (match, p1) => {
    return fontText(p1, 'sansSerifItalic');
  });

  md = md.replace(codeBlockRegex, (match, p1) => {
    return p1.trim(); 
  });

  return md;
}
