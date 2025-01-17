//Функция для проверки длины строки//
function checkStringMaxLength(string, maxLength) {
  return string.length <= maxLength;
}
checkStringMaxLength('test', 10);

//Функция для проверки является ли строка палиндромом//
const isPalindrome = (string) => {
  string = string.replaceAll(' ', '').toLowerCase();

  for (let i = 0; i < Math.floor(string.length / 2); i++) {
    if (string[i] !== string[string.length - 1 - i]) {
      return false;
    }
  }

  return true;
};

isPalindrome('Лёша на полке клопа нашёл ');


//Функция для возвращения целого положительного числа
function extractNumbers(input) {
  const inputString = `${input}`;
  let result = '';
  for (let i = 0; i < inputString.length; i++) {
    const char = inputString[i];
    if (char >= '0' && char <= '9') {
      result += char;
    }
  }

  return result === '' ? NaN : Number(result);
}

// Примеры использования:
extractNumbers('2023 год');
