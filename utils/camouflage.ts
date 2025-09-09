const CYRILLIC_MAP: { [key: string]: string } = {
  // Uppercase
  'A': 'А',
  'B': 'В',
  'C': 'С',
  'E': 'Е',
  'H': 'Н',
  'I': 'І', // Ukrainian/Belarusian I
  'J': 'Ј', // Serbian/Macedonian Je
  'K': 'К',
  'M': 'М',
  'O': 'О',
  'P': 'Р',
  'S': 'Ѕ', // Macedonian Dze
  'T': 'Т',
  'X': 'Х',
  'Y': 'У',

  // Lowercase
  'a': 'а',
  'b': 'ь', // Soft sign, looks like a 'b'
  'c': 'с',
  'e': 'е',
  'i': 'і', // Ukrainian/Belarusian i
  'j': 'ј', // Serbian/Macedonian je
  'k': 'к',
  'm': 'м',
  'o': 'о',
  'p': 'р',
  's': 'ѕ', // Macedonian Dze
  't': 'т',
  'x': 'х',
  'y': 'у',
};

export const camouflageText = (text: string): string => {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    result += CYRILLIC_MAP[char] || char;
  }
  return result;
};
