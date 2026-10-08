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

// тесты

checkStringLength('проверяемая строка', 20);
isPalindrome('топот');
extractNumber('2023 год');

const getTimeInMinutes = (time) => {
  const [hours, minutes] = time.split(':').map(Number);

  return hours * 60 + minutes;
};

const isMeetingWithinWorkDay = (workStart, workEnd, meetingStart, duration) => {
  const workStartMinutes = getTimeInMinutes(workStart);
  const workEndMinutes = getTimeInMinutes(workEnd);
  const meetingStartMinutes = getTimeInMinutes(meetingStart);
  const meetingEndMinutes = meetingStartMinutes + duration;

  return meetingStartMinutes >= workStartMinutes &&
    meetingEndMinutes <= workEndMinutes;
};

// тесты

isMeetingWithinWorkDay('08:00', '17:30', '14:00', 90); // true
isMeetingWithinWorkDay('8:0', '10:0', '8:0', 120); // true
isMeetingWithinWorkDay('08:00', '14:30', '14:00', 90); // false
isMeetingWithinWorkDay('14:00', '17:30', '08:0', 90); // false
isMeetingWithinWorkDay('8:00', '17:30', '08:00', 900); // false
