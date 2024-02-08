var remainingAttempts = 3;

// Проверка пароля
function checkPassword() {
  var password = document.getElementById('password').value;
  var correctPassword = 'boom'; // Замените 'your_password' на ваш реальный пароль
  if (password === correctPassword) {
    // Если пароль правильный, отобразить оформление сайта и скрыть форму ввода пароля
    document.getElementById('siteContent').style.display = "block";
    document.getElementById('passwordForm').style.display = "none";
  } else {
    // Если пароль неправильный, показать сообщение о неправильном пароле и уменьшить счетчик попыток
    remainingAttempts--;
    if (remainingAttempts === 0) {
      alert('Попытки закончились. Сайт будет закрыт.');
      window.close(); // Закрыть сайт
    } else {
      alert('Неправильный пароль. У вас осталось ' + remainingAttempts + ' попыток.');
    }
  }
}