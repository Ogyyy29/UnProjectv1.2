// Генерируем случайное число от 1 до 100
const secretNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0; // Счетчик попыток

// Функция для проверки попытки угадывания
function checkGuess() {
  const userGuess = parseInt(document.getElementById('userGuess').value);
  
  // Проверяем, что введено корректное число
  if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
    document.getElementById('result').textContent = 'Пожалуйста, введите число от 1 до 100!';
    return;
  }
  
  // Увеличиваем счетчик попыток
  attempts++;

  // Сравниваем число пользователя с загаданным числом
  if (userGuess === secretNumber) {
    document.getElementById('result').textContent = `Поздравляем! Вы угадали число ${secretNumber} за ${attempts} попыток!`;
  } else if (userGuess < secretNumber) {
    document.getElementById('result').textContent = 'Загаданное число больше, чем ваше.';
  } else {
    document.getElementById('result').textContent = 'Загаданное число меньше, чем ваше.';
  }
}
