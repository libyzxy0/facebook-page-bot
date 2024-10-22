const fontMap = {
  "a": {
    original: "a",
    boldItalic: "𝐚",
    sansSerifBold: "𝙖",
    bold: "𝗮",
    sansSerifItalic: "𝚊"
  },
  "b": {
    original: "b",
    boldItalic: "𝐛",
    sansSerifBold: "𝙗",
    bold: "𝗯",
    sansSerifItalic: "𝚋"
  },
  "c": {
    original: "c",
    boldItalic: "𝐜",
    sansSerifBold: "𝙘",
    bold: "𝗰",
    sansSerifItalic: "𝚌"
  },
  "d": {
    original: "d",
    boldItalic: "𝐝",
    sansSerifBold: "𝙙",
    bold: "𝗱",
    sansSerifItalic: "𝚍"
  },
  "e": {
    original: "e",
    boldItalic: "𝐞",
    sansSerifBold: "𝙚",
    bold: "𝗲",
    sansSerifItalic: "𝚎"
  },
  "f": {
    original: "f",
    boldItalic: "𝐟",
    sansSerifBold: "𝙛",
    bold: "𝗳",
    sansSerifItalic: "𝚏"
  },
  "g": {
    original: "g",
    boldItalic: "𝐠",
    sansSerifBold: "𝙜",
    bold: "𝗴",
    sansSerifItalic: "𝚐"
  },
  "h": {
    original: "h",
    boldItalic: "𝐡",
    sansSerifBold: "𝙝",
    bold: "𝗵",
    sansSerifItalic: "𝚑"
  },
  "i": {
    original: "i",
    boldItalic: "𝐢",
    sansSerifBold: "𝙞",
    bold: "𝗶",
    sansSerifItalic: "𝚒"
  },
  "j": {
    original: "j",
    boldItalic: "𝐣",
    sansSerifBold: "𝙟",
    bold: "𝗷",
    sansSerifItalic: "𝚓"
  },
  "k": {
    original: "k",
    boldItalic: "𝐤",
    sansSerifBold: "𝙠",
    bold: "𝗸",
    sansSerifItalic: "𝚔"
  },
  "l": {
    original: "l",
    boldItalic: "𝐥",
    sansSerifBold: "𝙡",
    bold: "𝗹",
    sansSerifItalic: "𝚕"
  },
  "m": {
    original: "m",
    boldItalic: "𝐦",
    sansSerifBold: "𝙢",
    bold: "𝗺",
    sansSerifItalic: "𝚖"
  },
  "n": {
    original: "n",
    boldItalic: "𝐧",
    sansSerifBold: "𝙣",
    bold: "𝗻",
    sansSerifItalic: "𝚗"
  },
  "o": {
    original: "o",
    boldItalic: "𝐨",
    sansSerifBold: "𝙤",
    bold: "𝗼",
    sansSerifItalic: "𝚘"
  },
  "p": {
    original: "p",
    boldItalic: "𝐩",
    sansSerifBold: "𝙥",
    bold: "𝗽",
    sansSerifItalic: "𝚙"
  },
  "q": {
    original: "q",
    boldItalic: "𝐪",
    sansSerifBold: "𝙦",
    bold: "𝗾",
    sansSerifItalic: "𝚚"
  },
  "r": {
    original: "r",
    boldItalic: "𝐫",
    sansSerifBold: "𝙧",
    bold: "𝗿",
    sansSerifItalic: "𝚛"
  },
  "s": {
    original: "s",
    boldItalic: "𝐬",
    sansSerifBold: "𝙨",
    bold: "𝘀",
    sansSerifItalic: "𝚜"
  },
  "t": {
    original: "t",
    boldItalic: "𝐭",
    sansSerifBold: "𝙩",
    bold: "𝘁",
    sansSerifItalic: "𝚝"
  },
  "u": {
    original: "u",
    boldItalic: "𝐮",
    sansSerifBold: "𝙪",
    bold: "𝘂",
    sansSerifItalic: "𝚞"
  },
  "v": {
    original: "v",
    boldItalic: "𝐯",
    sansSerifBold: "𝙫",
    bold: "𝘃",
    sansSerifItalic: "𝚟"
  },
  "w": {
    original: "w",
    boldItalic: "𝐰",
    sansSerifBold: "𝙬",
    bold: "𝘄",
    sansSerifItalic: "𝚠"
  },
  "x": {
    original: "x",
    boldItalic: "𝐱",
    sansSerifBold: "𝙭",
    bold: "𝘅",
    sansSerifItalic: "𝚡"
  },
  "y": {
    original: "y",
    boldItalic: "𝐲",
    sansSerifBold: "𝙮",
    bold: "𝘆",
    sansSerifItalic: "𝚢"
  },
  "z": {
    original: "z",
    boldItalic: "𝐳",
    sansSerifBold: "𝙯",
    bold: "𝘇",
    sansSerifItalic: "𝚣"
  },
  "A": {
    original: "A",
    boldItalic: "𝐀",
    sansSerifBold: "𝘼",
    bold: "𝗔",
    sansSerifItalic: "𝙰"
  },
  "B": {
    original: "B",
    boldItalic: "𝐁",
    sansSerifBold: "𝘽",
    bold: "𝗕",
    sansSerifItalic: "𝙱"
  },
  "C": {
    original: "C",
    boldItalic: "𝐂",
    sansSerifBold: "𝘾",
    bold: "𝗖",
    sansSerifItalic: "𝙲"
  },
  "D": {
    original: "D",
    boldItalic: "𝐃",
    sansSerifBold: "𝘿",
    bold: "𝗗",
    sansSerifItalic: "𝙳"
  },
  "E": {
    original: "E",
    boldItalic: "𝐄",
    sansSerifBold: "𝙀",
    bold: "𝗘",
    sansSerifItalic: "𝙴"
  },
  "F": {
    original: "F",
    boldItalic: "𝐅",
    sansSerifBold: "𝙁",
    bold: "𝗙",
    sansSerifItalic: "𝙵"
  },
  "G": {
    original: "G",
    boldItalic: "𝐆",
    sansSerifBold: "𝙂",
    bold: "𝗚",
    sansSerifItalic: "𝙶"
  },
  "H": {
    original: "H",
    boldItalic: "𝐇",
    sansSerifBold: "𝙃",
    bold: "𝗛",
    sansSerifItalic: "𝙷"
  },
  "I": {
    original: "I",
    boldItalic: "𝐈",
    sansSerifBold: "𝙄",
    bold: "𝗜",
    sansSerifItalic: "𝙸"
  },
  "J": {
    original: "J",
    boldItalic: "𝐉",
    sansSerifBold: "𝙅",
    bold: "𝗝",
    sansSerifItalic: "𝙹"
  },
  "K": {
    original: "K",
    boldItalic: "𝐊",
    sansSerifBold: "𝙆",
    bold: "𝗞",
    sansSerifItalic: "𝙺"
  },
  "L": {
    original: "L",
    boldItalic: "𝐋",
    sansSerifBold: "𝙇",
    bold: "𝗟",
    sansSerifItalic: "𝙻"
  },
  "M": {
    original: "M",
    boldItalic: "𝐌",
    sansSerifBold: "𝙈",
    bold: "𝗠",
    sansSerifItalic: "𝙼"
  },
  "N": {
    original: "N",
    boldItalic: "𝐍",
    sansSerifBold: "𝙉",
    bold: "𝗡",
    sansSerifItalic: "𝙽"
  },
  "O": {
    original: "O",
    boldItalic: "𝐎",
    sansSerifBold: "𝙊",
    bold: "𝗢",
    sansSerifItalic: "𝙾"
  },
  "P": {
    original: "P",
    boldItalic: "𝐏",
    sansSerifBold: "𝙋",
    bold: "𝗣",
    sansSerifItalic: "𝙿"
  },
  "Q": {
    original: "Q",
    boldItalic: "𝐐",
    sansSerifBold: "𝙌",
    bold: "𝗤",
    sansSerifItalic: "𝚀"
  },
  "R": {
    original: "R",
    boldItalic: "𝐑",
    sansSerifBold: "𝙍",
    bold: "𝗥",
    sansSerifItalic: "𝚁"
  },
  "S": {
    original: "S",
    boldItalic: "𝐒",
    sansSerifBold: "𝙎",
    bold: "𝗦",
    sansSerifItalic: "𝚂"
  },
  "T": {
    original: "T",
    boldItalic: "𝐓",
    sansSerifBold: "𝙏",
    bold: "𝗧",
    sansSerifItalic: "𝚃"
  },
  "U": {
    original: "U",
    boldItalic: "𝐔",
    sansSerifBold: "𝙐",
    bold: "𝗨",
    sansSerifItalic: "𝚄"
  },
  "V": {
    original: "V",
    boldItalic: "𝐕",
    sansSerifBold: "𝙑",
    bold: "𝗩",
    sansSerifItalic: "𝚅"
  },
  "W": {
    original: "W",
    boldItalic: "𝐖",
    sansSerifBold: "𝙒",
    bold: "𝗪",
    sansSerifItalic: "𝚆"
  },
  "X": {
    original: "X",
    boldItalic: "𝐗",
    sansSerifBold: "𝙓",
    bold: "𝗫",
    sansSerifItalic: "𝚇"
  },
  "Y": {
    original: "Y",
    boldItalic: "𝐘",
    sansSerifBold: "𝙔",
    bold: "𝗬",
    sansSerifItalic: "𝚈"
  },
  "Z": {
    original: "Z",
    boldItalic: "𝐙",
    sansSerifBold: "𝙕",
    bold: "𝗭",
    sansSerifItalic: "𝚉"
  }
};


export function fontText(text, fontType) {
  return text.split('').map(char => {
    const fontChar = fontMap[char];
    if (fontChar && fontChar[fontType]) {
      return fontChar[fontType];
    }
    return char;
  }).join('');
}
