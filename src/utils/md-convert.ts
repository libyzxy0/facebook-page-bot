import {
  fontText
} from '@/utils/fonts'

export function mdConvert(md, fontType) {
  const boldRegex = /\*\*(.*?)\*\*/g;

  return md.replace(boldRegex, (match, p1) => {
    return fontText(p1, fontType);
  });
}
