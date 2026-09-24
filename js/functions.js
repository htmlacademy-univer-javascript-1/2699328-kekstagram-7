const checkStringLength = (string, maxLength) => string.length <= maxLength;

const isPalindrome = (string) => {
  const normalizedString = string.replaceAll(' ', '').toLowerCase();
  let reversedString = '';

  for (let i = normalizedString.length - 1; i >= 0; i -= 1) {
    reversedString += normalizedString[i];
  }

  return normalizedString === reversedString;
};

const extractNumber = (value) => {
  const string = value.toString();
  let result = '';

  for (let i = 0; i < string.length; i += 1) {
    const number = parseInt(string[i], 10);

    if (!Number.isNaN(number)) {
      result += number;
    }
  }

  return result === '' ? NaN : parseInt(result, 10);
};

checkStringLength('проверяемая строка', 20);
isPalindrome('топот');
extractNumber('2023 год');
